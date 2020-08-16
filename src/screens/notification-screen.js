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
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const NotificationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const me = useSelector(state => state.user.me);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async index => {
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
      const fetchedNotifications = result?.data?.notifications?.data ?? [];
      const fetchedTotalNotifications = result?.data?.notifications?.total ?? 0;
      setNotifications(fetchedNotifications);
      setTotal(fetchedTotalNotifications);
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

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <NotificationItem content={item} type="box" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CommonView
          style={{
            justifyContent: 'center',
          }}
        >
          <View>
            <Text>Total: {total}</Text>
          </View>
          {notifications.length > 0 ? (
            <View style={styles.list}>
              <FlatList
                data={notifications}
                keyExtractor={item => item._id}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                }
                renderItem={renderItem}
              />
            </View>
          ) : (
            <View style={styles.list}>
              <Text style={{ textAlign: 'center' }}>No data</Text>
            </View>
          )}
        </CommonView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    alignContent: 'center',
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
