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

import { CommonButtonGroup } from '../components/common-button-group';
import { CommonView } from '../components/common-view';
import { NotificationItem } from '../components/notification-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const NotificationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const me = useSelector(state => state.user.me);
  let warningStatus = 'PENDING';
  let warningSupporter = null;
  const [warnings, setWarnings] = useState([]);
  const [total, setTotal] = useState(0);
  const sampleHistoryWarning = {
    data: {
      warnings: {
        data: [
          {
            _id: '5f30284a63a8f1276cfed6d6',
            content: 'Wrong barbell shoulder3',
            createdAt: '2020-04-09T16:46:02.523Z',
            image: {
              url:
                'https://i.pinimg.com/originals/df/a6/e6/dfa6e62d42775848a01048ed114f23b0.jpg',
            },
            status: 'SUCCEEDED',
            updatedAt: '2020-08-09T16:46:11.686Z',
          },
        ],
        total: 1,
      },
    },
  };
  const samplePendingWarning = {
    data: {
      warnings: {
        data: [
          {
            _id: '5f2a78a55b2aaf1eec5ed411',
            content: 'Wrong barbell shoulder',
            createdAt: '2020-07-05T09:15:18.213Z',
            image: {
              url:
                'https://i.pinimg.com/originals/df/a6/e6/dfa6e62d42775848a01048ed114f23b0.jpg',
            },
            status: 'PEDNING',
            updatedAt: '2020-08-09T16:40:28.488Z',
          },
          {
            _id: '5f30284a63a8f1276cfed6d6',
            content: 'Wrong barbell shoulder3',
            createdAt: '2020-04-09T16:46:02.523Z',
            image: {
              url:
                'https://i.pinimg.com/originals/df/a6/e6/dfa6e62d42775848a01048ed114f23b0.jpg',
            },
            status: 'PEDNING',
            updatedAt: '2020-08-09T16:46:11.686Z',
          },
        ],
        total: 2,
      },
    },
  };
  const fetchData = async index => {
    setRefreshing(true);
    setActiveIndex(index);
    if (index === 0) {
      warningStatus = 'PENDING';
      // warningStatus = 'FAILED';
      warningSupporter = null;
    } else if (index === 1) {
      warningStatus = 'SUCCEEDED';
      warningSupporter = me._id;
    }
    try {
      const result = await client.query({
        query: gql`
          query($supporterId: [ID], $status: [String]) {
            warnings(
              query: {
                limit: 10
                filter: { status: $status, supporter: $supporterId }
              }
            ) {
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
        variables: {
          status: warningStatus,
          supporterId: warningSupporter,
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
  }, [warningStatus, warningSupporter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(activeIndex);
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
      <View style={styles.container}>
        <CommonView
          style={{
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    // borderBottomColor: COLORS.gray,
    // borderBottomWidth: 1,
    // margin: DIMENSIONS.MARGIN,
  },
});
