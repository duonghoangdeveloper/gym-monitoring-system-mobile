import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonIcon } from '../components/common-icon';
import { CommonView } from '../components/common-view';
import { DIMENSIONS } from '../constants/dimensions';
import { UPDATE_PROFILE } from '../redux/user/user.types';

export const TrainerHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const me = useSelector(state => state.user.me);

  const changeOnlineStatus = async (_id, isOnline) => {
    setLoading(true);
    try {
      const user = await client.query({
        query: gql`
          mutation ChangeOnlineStatus($_id: ID!, $status: Boolean) {
            changeOnlineStatus(_id: $_id, status: $status) {
              isOnline
            }
          }
        `,
        variables: {
          _id,
          status: isOnline,
        },
      });
      dispatch({
        payload: {
          me: {
            ...me,
            isOnline: user.data.changeOnlineStatus.isOnline,
          },
        },
        type: UPDATE_PROFILE,
      });
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{ marginRight: DIMENSIONS.DISTANCE_2 }}
        >
          <CommonIcon color="white" name="bell" size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <CommonView>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => changeOnlineStatus(me._id, !me.isOnline)}
          style={{
            alignItems: 'center',
            borderRadius: 50,
            height: 100,
            justifyContent: 'center',
            padding: 10,
            width: 100,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" />
          ) : me.isOnline ? (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#34B586',
                borderRadius: 50,
                height: 100,
                justifyContent: 'center',
                padding: 10,
                width: 100,
              }}
            >
              <CommonIcon color="black" name="bell" size={22} />
              <Text>Online</Text>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#FF655D',
                borderRadius: 50,
                height: 100,
                justifyContent: 'center',
                padding: 10,
                width: 100,
              }}
            >
              {loading && <ActivityIndicator size={110} />}
              <CommonIcon color="black" name="bell-slash" size={22} />
              <Text>Offline</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </CommonView>
  );
};
