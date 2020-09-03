import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import { DATE_TIME_FORMAT } from '../common/constants';
import { CommonListItem } from '../components/common-list-item';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
// import { PAGE_SIZE } from '../common/constants';
import { CommonView } from '../components/common-view';

export const NotificationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const me = useSelector(state => state.user.me);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setRefreshing(true);
    const user = me._id;
    try {
      const result = await client.query({
        query: gql`
          query($user: [ID]) {
            notifications(query: { filter: { user: $user } }) {
              total
              data {
                _id
                content
                status
                createdAt
                updatedAt
              }
            }
          }
        `,
        variables: {
          user,
        },
      });
      const fetchedDataNotifications = result?.data?.notifications?.data ?? [];
      const fetchedTotalNotifications = result?.data?.notifications?.total ?? 0;
      setTotal(fetchedTotalNotifications);
      setNotifications(
        fetchedDataNotifications.map(payment => ({
          key: payment._id,
          ...payment,
          date: moment(payment.createdAt).format(DATE_TIME_FORMAT),
        }))
      );
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonScrollViewAwareScreenHeight
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={styles.container}
      >
        <CommonView
          style={{
            justifyContent: 'center',
          }}
        >
          {notifications.length > 0 ? (
            <View style={styles.list}>
              {notifications.map(notification => (
                <TouchableOpacity>
                  <CommonListItem
                    detail={notification.date}
                    label={notification.content}
                    refreshControl={
                      <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                      />
                    }
                    showSeparator="true"
                    type="detail"
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.list}>
              <Text style={{ textAlign: 'center' }}>No data</Text>
            </View>
          )}
        </CommonView>
      </CommonScrollViewAwareScreenHeight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
});
