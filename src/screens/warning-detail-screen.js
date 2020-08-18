import { useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const WarningDetailScreen = ({ navigation, route }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const me = useSelector(state => state.user.me);
  const [warning, setWarning] = useState({});
  // useFocusEffect(() => {
  //   fetchData(route.params.item);
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const acceptWarning = async () => {
    setLoading(true);
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
      if (fetchedWarning.status === 'SUCCEEDED')
        Alert.alert('Accept succeeded!');
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setLoading(false);
  };

  return (
    <CommonScrollViewAwareScreenHeight>
      <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {loading && <CommonLoadingComponent />}
          <Image
            source={{ uri: warning.image?.url }}
            style={{
              height: scaleV(300),
              marginBottom: DIMENSIONS.DISTANCE_5,
              width: scaleH(300),
            }}
          />
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark80,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Customer:</Text>
            <Text style={textStyle.bodyText}>{warning.customer?.username}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark80,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Status:</Text>
            <Text style={textStyle.bodyText}>{warning.status}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark80,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Time:</Text>
            <Text style={textStyle.bodyText}>{warning.createdAt}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark80,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Content:</Text>
            <View
              style={{
                alignItems: 'flex-start',
                borderColor: COLORS.dark90,
                borderWidth: 1,
                justifyContent: 'center',
                padding: DIMENSIONS.DISTANCE_3,
              }}
            >
              <Text style={textStyle.bodyText}>{warning.content}</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'stretch',
              alignSelf: 'stretch',
              marginVertical: DIMENSIONS.DISTANCE_3,
            }}
          >
            {me.role === 'CUSTOMER' && warning.status === 'SUCCEEDED' && (
              <CommonButton
                gradient
                // onPress={() => {
                //   navigation.navigate('Feedback Trainer', { name: 'trainer' });
                // }}
                title="Feedback"
              />
            )}
            {me.role === 'TRAINER' && warning.status === 'PENDING' && (
              <CommonButton
                gradient
                onPress={() => acceptWarning()}
                // onPress={() => {
                //   navigation.navigate('Feedback Trainer', { name: 'trainer' });
                // }}
                title="Accept"
              />
            )}
          </View>
        </View>
      </View>
    </CommonScrollViewAwareScreenHeight>
  );
};
