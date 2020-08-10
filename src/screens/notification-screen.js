import { useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

import { CommonAvatar } from '../components/common-avatar';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { NotificationDetailScreen } from './notification-detail-screen';

export const NotificationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [total, setTotal] = useState(0);
  const me = useSelector(state => state.user.me);

  useFocusEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query # ($supporterId: [ID])
          {
            warnings(query: { limit: 5, filter: { status: "PENDING" } }) {
              total
              data {
                _id
                # customer {
                #   _id
                #   username
                # }
                # supporter {
                #   _id
                #   username
                # }
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
        // variables: {
        //   supporterId: 'PENDING',
        // },
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification Detail', { item })}
    >
      <NotificationItem content={item} type="box" />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <CommonScrollViewAwareScreenHeight>
        {loading && <CommonLoadingComponent />}
        <CommonView
          style={{
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <View style={styles.titleContainer}>
            <Text style={textStyle.sectionHeadingBold}>Pending</Text>
            <Text
              style={{
                alignSelf: 'flex-end',
              }}
            >
              Total: {total}
            </Text>
          </View>

          <FlatList
            data={warnings}
            extraData={selectedId}
            keyExtractor={item => item._id}
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
  },
  item: {
    // marginHorizontal: 16,
    // marginVertical: 8,
    // padding: 20,
  },
  titleContainer: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
});
