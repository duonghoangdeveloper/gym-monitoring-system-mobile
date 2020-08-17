import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { DIMENSIONS } from '../constants/dimensions';
import { UPDATE_STATUS } from '../redux/user/user.types';

export const TrainerHomeScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState(
    useSelector(state => state.user.me)
  );

  const changeOnlineStatus = async (_id, isOnline) => {
    setLoading(true);
    try {
      await client.query({
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
      setUpdateUser({ ...updateUser, isOnline });
      dispatch({
        payload: {
          me: updateUser,
        },
        type: UPDATE_STATUS,
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
        <CommonButton
          icon={<CommonIcon color="white" name="bell" />}
          onPress={() => navigation.navigate('Notification')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Text>Press to work</Text>
      <TouchableOpacity
        onPress={() => changeOnlineStatus(updateUser._id, !updateUser.isOnline)}
      >
        <View style={updateUser.isOnline ? styles.abc : styles.def}>
          {loading && <ActivityIndicator color="white" />}

          {updateUser.isOnline ? (
            <Text>WORKING</Text>
          ) : (
            <Text>NOT WORKING</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  abc: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 100,
    height: 150,
    justifyContent: 'center',
    width: 150,
  },

  def: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 100,
    height: 150,
    justifyContent: 'center',
    width: 150,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
});
