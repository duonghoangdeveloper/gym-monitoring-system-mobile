import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Image, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonListItem } from '../components/common-list-item';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';
import { DIMENSIONS } from '../constants/dimensions';

export const WarningDetailScreen = ({ navigation, route }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const [warning, setWarning] = useState({});
  const me = useSelector(state => state.user.me);
  useEffect(() => {
    fetchData(route.params.item);
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    const warningId = route.params.item._id;
    try {
      const result = await client.query({
        query: gql`
          query($warningId: ID!) {
            warning(_id: $warningId) {
              _id
              customer {
                _id
                username
              }
              supporter {
                _id
                avatar {
                  url
                }
                username
              }
              image {
                url
              }
              dangerousPosture {
                title
                description
                dangerousPostureType {
                  title
                  description
                }
              }
              content
              status
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          warningId,
        },
      });
      const fetchedWarning = result?.data?.warning ?? [];
      setWarning(fetchedWarning);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
  };

  const acceptWarning = async () => {
    setRefreshing(true);
    const warningId = route.params.item._id;
    try {
      const result = await client.query({
        query: gql`
          mutation($warningId: ID!) {
            acceptWarning(_id: $warningId) {
              _id
              supporter {
                username
              }
              status
            }
          }
        `,
        variables: {
          warningId,
        },
      });
      const fetchedWarning = result?.data?.acceptWarning ?? [];
      if (fetchedWarning.status === 'ACCEPTED')
        Alert.alert('Accept succeeded!');
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    fetchData();
  };

  return (
    <CommonScrollViewAwareScreenHeight
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <Image
        source={{
          uri:
            warning.image?.url ??
            'https://drive.google.com/uc?id=1Glrj5Kfh1dtu6VTp6PlvS7vxHCu35ctP',
        }}
        style={{
          height: (DIMENSIONS.SCREEN_WIDTH / 16) * 9,
          width: DIMENSIONS.SCREEN_WIDTH,
        }}
      />
      <CommonView style={{ flex: 1 }}>
        <CommonListItem
          detail={warning.customer?.username ?? 'N/A'}
          label="Customer"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={warning.status}
          label="Status"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={moment(warning.createdAt).format('DD/MM/YYYY, HH:mm')}
          label="Time"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={warning.content}
          label="Content"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={
            warning.dangerousPosture?.dangerousPostureType?.title ?? 'N/A'
          }
          label="Dangerous posture type"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={warning.dangerousPosture?.title ?? 'N/A'}
          label="Dangerous posture"
          showSeparator="true"
          type="detail"
        />
        {me.role === 'CUSTOMER' && (
          <CommonListItem
            detail={warning.supporter?.username ?? 'N/A'}
            label="Supporter"
            showSeparator="true"
            type="detail"
          />
        )}
        {warning.status === 'PENDING' && me.role === 'TRAINER' ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              marginTop: 40,
              padding: 12,
            }}
          >
            <CommonButton onPress={() => acceptWarning()} title="Accept" />
          </View>
        ) : warning.status === 'ACCEPTED' && me.role === 'TRAINER' ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              marginTop: 40,
              padding: 12,
            }}
          >
            <CommonButton
              onPress={() =>
                navigation.navigate('Choose Posture', {
                  warningId: warning._id,
                })
              }
              title="Select Dangerous Posture"
            />
          </View>
        ) : (
          warning.status === 'ACCEPTED' &&
          me.role === 'CUSTOMER' && (
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
                marginTop: 40,
                padding: 12,
              }}
            >
              <CommonButton
                onPress={() =>
                  navigation.navigate('Feedback Trainer', {
                    staff: warning.supporter,
                  })
                }
                title="Feedback"
              />
            </View>
          )
        )}
      </CommonView>
    </CommonScrollViewAwareScreenHeight>
  );
};
