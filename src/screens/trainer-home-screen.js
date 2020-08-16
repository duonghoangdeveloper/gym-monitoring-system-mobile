import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { UPDATE_STATUS } from '../redux/user/user.types';

export const TrainerHomeScreen = ({ navigation }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState(
    useSelector(state => state.user.me)
  );

  const changeOnlineStatus = async (_id, isOnline) => {
    try {
      // const result =
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
      // console.log(result.data.changeOnlineStatus.isOnline);
      setUpdateUser({ ...updateUser, isOnline });
      dispatch({
        payload: {
          me: updateUser,
        },
        type: UPDATE_STATUS,
      });
      Alert.alert('Update working status to succeed!');
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
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
      <Text>Trainer working status: {updateUser.isOnline.toString()}</Text>
      <CommonButton
        onPress={() => changeOnlineStatus(updateUser._id, !updateUser.isOnline)}
        title="Change online status"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
});
