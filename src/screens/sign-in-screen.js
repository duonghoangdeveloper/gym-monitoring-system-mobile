import { useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import * as Font from 'expo-font';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { registerForPushNotificationsAsync } from '../../App';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { TOKEN_KEY } from '../constants/app';
import { scaleH, scaleV } from '../constants/dimensions';
import { SIGN_IN } from '../redux/user/user.types';

export const SignInScreen = ({ navigation }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignInPress = async () => {
    setLoading(true);
    const expoPushToken = await registerForPushNotificationsAsync();
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation SignIn(
            $username: String!
            $password: String!
            $deviceToken: String!
          ) {
            signIn(
              data: {
                username: $username
                password: $password
                deviceToken: $deviceToken
              }
            ) {
              token
              data {
                _id
                username
                displayName
                gender
                email
                phone
                role
                isOnline
              }
            }
          }
        `,
        variables: {
          deviceToken: expoPushToken,
          password,
          username,
        },
      });

      const { role } = result.data.signIn.data;

      if (role === 'CUSTOMER' || role === 'TRAINER') {
        dispatch({
          payload: {
            me: result.data.signIn.data,
          },
          type: SIGN_IN,
        });
        AsyncStorage.setItem(TOKEN_KEY, result.data.signIn.token);
        // navigation.navigate('Home');
      } else {
        setLoading(false);
        Alert.alert('Unauthorized!');
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Wrong username or password!');
      // message.error('Wrong username or password!');
    }
  };

  return (
    <CommonDismissKeyboardWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <Text h3 style={styles.title}>
          Sign In
        </Text>
        <Input
          leftIcon={
            <Icon
              color="#7f7f7f"
              name="user"
              size={24}
              style={styles.inputIcon}
              type="font-awesome"
            />
          }
          onChangeText={setUsername}
          placeholder="Enter username"
          value={username}
        />
        <Input
          leftIcon={
            <Icon
              color="#7f7f7f"
              name="lock"
              size={24}
              style={styles.inputIcon}
              type="font-awesome"
            />
          }
          onChangeText={setPassword}
          placeholder="Enter password"
          rightIcon={
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={styles.passwordVisibleToggleButton}
            >
              <Icon
                color="#7f7f7f"
                name={visible ? 'eye' : 'eye-slash'}
                size={20}
                type="font-awesome-5"
              />
            </TouchableOpacity>
          }
          secureTextEntry={!visible}
          type="password"
        />
        <Button
          containerStyle={styles.signInButton}
          loading={loading}
          onPress={handleSignInPress}
          title="Sign in"
        />
      </KeyboardAvoidingView>
    </CommonDismissKeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },

  inputIcon: {
    marginRight: 8,
  },

  passwordVisibleToggleButton: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    left: scaleH(270),
    marginBottom: scaleV(-50),

    paddingHorizontal: scaleH(8),
    // justifyContent: 'center',
    width: 40,
  },

  signInButton: {
    // borderRadius: 10,
    marginTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
  },

  title: {
    fontWeight: '600',
    marginBottom: 24,
  },
});
