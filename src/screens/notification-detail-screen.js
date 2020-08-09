import { useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const NotificationDetailScreen = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({});

  useFocusEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query {
            warning(_id: "5f2a78a55b2aaf1eec5ed411") {
              _id
              customer {
                displayName
              }
              image
              content
              status
              createdAt
              updatedAt
            }
          }
        `,
      });
      const fetchedWarning = result?.data?.warning ?? [];
      setWarning(fetchedWarning);
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
          <Image
            source={{ uri: warning.image }}
            style={{
              height: 300,
              marginBottom: DIMENSIONS.DISTANCE_5,
              width: 300,
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
            <Text style={textStyle.bodyText}>
              {/* {warning.customer.displayName} */}
            </Text>
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
                borderColor: COLORS.dark90,
                borderWidth: 1,
                padding: DIMENSIONS.DISTANCE_2,
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
            <CommonButton
              gradient
              // onPress={fetchData}
              rightIcon={<CommonIcon color="white" name="arrow-right" />}
              title="Feedback"
            />
          </View>
        </View>
      </View>
    </CommonScrollViewAwareScreenHeight>
  );
};
