import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { CommonAvatar } from '../components/common-avatar';
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
    console.log(updateUser);
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

  return (
    <ScrollView style={styles.scrollView}>
      <CommonView>
        <View style={styles.avatarContainer}>
          <CommonAvatar
            editable
            label="string"
            size="xxsmall"
            uri="https://reactnative.dev/img/tiny_logo.png"
          />
        </View>
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
          }}
          value={updateUser.phone}
        />

        <CommonInputForm
          defaultValue={updateUser.gender}
          dropDownList={USER_GENDERS}
          label="Gender"
          onChangeText={text => setUpdateUser({ ...updateUser, gender: text })}
          placeholder="Choose gender"
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,
          }}
          type="dropdown"
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
    backgroundColor: 'white',
    flex: 1,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingBottom: 70,
  },
});
