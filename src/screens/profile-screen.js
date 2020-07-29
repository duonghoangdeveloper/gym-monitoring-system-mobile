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
import { USER_GENDERS } from '../common/constants';
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
      console.log('123');
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateProfile(
            $username: String
            $displayName: String
            $email: String
            $phone: String
            $gender: Gender
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
      <View style={styles.view}>
        <Avatar
          activeOpacity={0.7}
          icon={{ name: 'user', type: 'font-awesome' }}
          rounded
          showEditButton="true"
          size="xlarge"
          source={avatar}
        />

        <Divider style={{ backgroundColor: 'black', height: 1 }} />

        <Input
          label="Username"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, username: text });
          }}
          value={updateUser.username}
        />
        <Input
          label="Display name"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, displayName: text });
          }}
          value={updateUser.displayName}
        />
        <Input
          label="Email"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, email: text });
          }}
          value={updateUser.email}
        />
        <Input
          label="Phone"
          onChangeText={text => {
            setUpdateUser({ ...updateUser, phone: text });
          }}
          value={updateUser.phone}
        />
        <Input label="Role" value={updateUser.role} />
        <ButtonGroup
          buttons={USER_GENDERS}
          label="Gender"
          onPress={index => {
            setUpdateUser({ ...updateUser, gender: USER_GENDERS[index] });
          }}
          selectedIndex={USER_GENDERS.indexOf(updateUser.gender)}
        />

        <Divider style={{ backgroundColor: 'black', height: 1 }} />

        <Button loading={loading} onPress={handleUpdatePress} title="Update" />

        <Button
          loading={loading}
          onPress={handleUpdatePress}
          title="Change Password"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 30,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingBottom: 70,
  },
});
