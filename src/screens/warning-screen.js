import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

// import { PAGE_SIZE } from '../common/constants';
import { CommonButtonGroup } from '../components/common-button-group';
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const WarningScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const me = useSelector(state => state.user.me);
  const [warnings, setWarnings] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async index => {
    setRefreshing(true);
    setActiveIndex(index);

    let status = null;
    let customerId = null;
    const supporterId = null;
    if (index === 0) {
      status = 'PENDING';
      // status = 'FAILED';
    } else if (index === 1) {
      status = ['SUCCEEDED', 'FAILED'];
      if (me.role === 'CUSTOMER') {
        customerId = me._id;
      }
      if (me.role === 'TRAINER') {
        // supporterId = me._id;
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
                limit: 10
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
      const fetchedTotalWarnings = result?.data?.warnings?.total ?? 0;
      setWarnings(fetchedWarnings);
      setTotal(fetchedTotalWarnings);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [activeIndex]);

  const onRefresh = () => {
    setRefreshing(true);
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
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.container}>
    <CommonView
      style={{
        justifyContent: 'center',
      }}
    >
      {/* // <View style={styles.titleContainer}>
      //   <Text style={textStyle.sectionHeadingBold}>Pending</Text>
      //   <Text
      //     style={{
      //       alignSelf: 'flex-end',
      //     }}
      //   >
      //   </Text>
    // </View> */}
      <CommonButtonGroup
        activeIndex={activeIndex}
        labels={['Pending', 'History']}
        onItemPress={index => {
          fetchData(index);
        }}
        style={{ marginBottom: DIMENSIONS.MARGIN }}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
