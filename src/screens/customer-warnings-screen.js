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

import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';

export const CustomerWarningScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const me = useSelector(state => state.user.me);
  const [warnings, setWarnings] = useState([]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const result = await client.query({
        query: gql`
          query($customerId: [ID]) {
            warnings(query: { limit: 10, filter: { customer: $customerId } }) {
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
          customerId: me._id,
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
    fetchData();
    console.log(warnings);
  }, []);

  const onRefresh = () => {
    fetchData();
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
      {warnings.length > 0 ? (
        <FlatList
          data={warnings}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
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
    </CommonView>
    //   </View>
    // </SafeAreaView>
  );
};
