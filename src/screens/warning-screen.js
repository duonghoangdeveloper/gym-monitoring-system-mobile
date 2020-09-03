import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { CommonButtonGroup } from '../components/common-button-group';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { DIMENSIONS } from '../constants/dimensions';

export const WarningScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const me = useSelector(state => state.user.me);
  const [warnings, setWarnings] = useState([]);

  const fetchData = async index => {
    setRefreshing(true);
    setActiveIndex(index);

    let status = null;
    let customerId = null;
    const supporterId = null;
    if (index === 0) {
      status = 'PENDING';
    } else if (index === 1) {
      status = ['ACCEPTED', 'FAILED'];
      if (me.role === 'CUSTOMER') {
        customerId = me._id;
      }
    }
    try {
      const result = await client.query({
        query: gql`
          query(
            $customerId: [ID]
            $supporterId: [ID]
            $status: [WarningStatus]
          ) {
            warnings(
              query: {
                # limit: 10
                filter: {
                  status: $status
                  customer: $customerId
                  supporter: $supporterId
                }
              }
            ) {
              total
              data {
                _id
                image {
                  url
                }
                content
                status
                createdAt
                updatedAt
              }
            }
          }
        `,
        variables: {
          customerId,
          status,
          supporterId,
        },
      });
      const fetchedWarnings = result?.data?.warnings?.data ?? [];
      setWarnings(fetchedWarnings);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData(activeIndex);
  }, [activeIndex]);

  const onRefresh = () => {
    fetchData(activeIndex);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Warning Detail', { item })}
    >
      <NotificationItem content={item} type="box" />
    </TouchableOpacity>
  );

  return (
    <CommonView
      style={{
        justifyContent: 'center',
      }}
    >
      <CommonButtonGroup
        activeIndex={activeIndex}
        labels={['Pending', 'History']}
        onItemPress={index => {
          fetchData(index);
        }}
        style={{ marginBottom: DIMENSIONS.MARGIN }}
      />
      <CommonScrollViewAwareScreenHeight
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {warnings.length > 0 ? (
          <FlatList
            data={warnings}
            keyExtractor={item => item._id}
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Text>No data</Text>
          </View>
        )}
      </CommonScrollViewAwareScreenHeight>
    </CommonView>
  );
};
