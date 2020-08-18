import { useApolloClient } from '@apollo/react-hooks';
import { FontAwesome5 } from '@expo/vector-icons';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { CommonView } from '../components/common-view';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { UPDATE_PROFILE } from '../redux/user/user.types';

export const TrainerHomeScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const me = useSelector(state => state.user.me);

  const changeOnlineStatus = async (_id, isOnline) => {
    console.log(_id, isOnline);
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
      console.log(JSON.stringify(user));
      dispatch({
        payload: {
          me: {
            ...me,
            isOnline: user.data.changeOnlineStatus.isOnline,
          },
        },
        type: UPDATE_PROFILE,
      });
      // Alert.alert('Update working status to succeed!');
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
          <FontAwesome5 color="#fff" name="bell" size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <CommonView>
      <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <CommonButton
          onPress={() => changeOnlineStatus(me._id, !me.isOnline)}
          title={me.isOnline ? 'Go offline' : 'Press to work'}
        />
      </View>
    </CommonView>
  );
};
