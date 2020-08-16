import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { UPDATE_STATUS } from '../redux/user/user.types';

export const TrainerHomeScreen = ({ navigation }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState(
    useSelector(state => state.user.me)
  );

  const changeOnlineStatus = async (_id, isOnline) => {
    console.log(updateUser);
    console.log(isOnline);
    console.log(updateUser.isOnline);
    console.log('--------------------------------------');
    try {
      const result = await client.query({
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
      console.log(result.data.changeOnlineStatus.isOnline);
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
  return (
    <View style={styles.centeredView}>
      <Text>Trainer working status: {updateUser.isOnline.toString()}</Text>
      <CommonButton
        onPress={() => changeOnlineStatus(updateUser._id, !updateUser.isOnline)}
        title="Change online status"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
