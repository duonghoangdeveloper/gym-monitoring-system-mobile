import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Input,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/avatar.png';
import { CommonAvatar } from '../components/common-avatar';
import { CommonBadgeIcon } from '../components/common-badge-icon';
import { CommonButton } from '../components/common-button';
import { CommonInputForm } from '../components/common-input-form';
import { CommonView } from '../components/common-view';
import { USER_GENDERS } from '../constants/app';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { UPDATE_PROFILE } from '../redux/user/user.types';

export const ProfileScreen = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState(
    useSelector(state => state.user.me)
  );

  const handleUpdatePress = async () => {
    setLoading(true);
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateProfile(
            $username: String
            $displayName: String
            $email: String
            $phone: String
            $gender: String
          ) {
            updateProfile(
              data: {
                username: $username
                displayName: $displayName
                phone: $phone
                email: $email
                gender: $gender
              }
            ) {
              _id
              displayName
              email
              gender
              phone
              username
            }
          }
        `,
        variables: {
          _id: updateUser._id,
          displayName: updateUser.displayName,
          email: updateUser.email,
          gender: updateUser.gender,
          phone: updateUser.phone,
          username: updateUser.username,
        },
      });
      console.log('result: ', result);

      dispatch({
        payload: {
          me: updateUser,
        },
        type: UPDATE_PROFILE,
      });
      Alert.alert('Update profile succeed!');
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setLoading(false);
  };
  console.log(updateUser.gender);
  return (
    <ScrollView style={styles.scrollView}>
      <CommonView
        style={
          {
            // justifyContent: 'center',
          }
        }
      >
        <View style={styles.avatarContainer}>
          <CommonAvatar
            editable
            label="string"
            // onAvatarPress
            size="xxsmall"
            uri="https://reactnative.dev/img/tiny_logo.png"
          />
        </View>
        {/* <Divider style={{ backgroundColor: 'white', height: 50 }} /> */}
        <CommonInputForm
          label="Username"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, username: text });
          }}
          placeholder="Enter your username"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.username}
        />
        <CommonInputForm
          label="Display name"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, displayName: text });
          }}
          placeholder="Enter your display name"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.displayName}
        />
        <CommonInputForm
          label="Email"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, email: text });
          }}
          placeholder="Enter your email"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.email}
        />
        <CommonInputForm
          label="Phone"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, phone: text });
          }}
          placeholder="Enter your phone"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.phone}
        />
        <CommonInputForm
          label="Phone"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, phone: text });
          }}
          placeholder="Enter your phone"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.phone}
        />
        {/* <CommonInputForm
          label="Gender"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, gender: text });
          }}
          placeholder="Enter your phone"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          value={updateUser.gender}
        /> */}
        <CommonInputForm
          // defaultValue={updateUser.gender}
          dropDownList={USER_GENDERS}
          label="Gender"
          onValueChange={text => {
            setUpdateUser({ ...updateUser, gender: text });
          }}
          placeholder="Choose gender"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
          type="dropdown"
          value={updateUser.gender}
        />

        <Divider style={{ backgroundColor: 'white', height: 40 }} />
        <CommonButton
          label="Update"
          loading={loading}
          onPress={handleUpdatePress}
        />
        <Divider style={{ backgroundColor: 'white', height: 40 }} />
      </CommonView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: DIMENSIONS.PADDING,
  },

  scrollView: {
    // padding: 30,
    // alignItems: 'stretch',
    backgroundColor: 'white',
    flex: 1,
    // padding: DIMENSIONS.PADDING,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingBottom: 70,
  },
});
