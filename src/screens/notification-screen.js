import { useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonAvatar } from '../components/common-avatar';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { DIMENSIONS } from '../constants/dimensions';
import { NotificationDetailScreen } from './notification-detail-screen';

export const NotificationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query {
            warnings(query: {}) {
              data {
                _id
                customer {
                  _id
                }
                supporter {
                  _id
                }
                image
                content
                status
                createdAt
              }
              total
            }
          }
        `,
      });
      const fetchedWarnings = result?.data?.warnings?.data ?? [];
      const fetchedTotalWarnings = result?.data?.warnings?.total ?? 0;
      setWarnings(fetchedWarnings);
      setTotal(fetchedTotalWarnings);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setLoading(false);
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NotificationDetail')}
      style={style}
    >
      <NotificationItem content={item} type="box" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    <Item
      item={item}
      onPress={() => setSelectedId(item.id)}
      // style={{ backgroundColor }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <CommonScrollViewAwareScreenHeight>
        {/* {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>} */}
        {loading && <CommonLoadingComponent />}
        <CommonView
          style={{
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              alignSelf: 'flex-end',
            }}
          >
            {total}
          </Text>
          <FlatList
            data={warnings}
            extraData={selectedId}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </CommonView>
      </CommonScrollViewAwareScreenHeight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // marginHorizontal: 16,
    // marginVertical: 8,
    // padding: 20,
  },
  title: {
    // fontSize: 32,
  },
});
