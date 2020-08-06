import { useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Divider, Icon, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { TOKEN_KEY } from '../constants/app';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
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
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation SignIn($username: String!, $password: String!) {
            signIn(data: { username: $username, password: $password }) {
              token
              data {
                _id
                username
                displayName
                gender
                email
                phone
                role
              }
            }
          }
        `,
        variables: {
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
      <View
        style={{
          alignItems: 'stretch',
          backgroundColor: 'white',
          flex: 1,
          padding: DIMENSIONS.PADDING,

          // justifyContent: 'center',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}
        >
          <Text h3 style={styles.title}>
            Sign In
          </Text>

          <CommonInputForm
            label="Username"
            onChangeText={text => setUsername(text)}
            placeholder="Enter username"
            style={{
              alignItems: 'center',
              backgroundColor: 'black',
              flex: 1,

              // justifyContent: 'center',
            }}
            value={username}
          />

          <CommonInputForm
            label="Password"
            // error={error}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={!visible}
            value={password}
          />

          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.passwordVisibleToggleButton}
          >
            <Icon
              color="#7f7f7f"
              name={visible ? 'eye' : 'eye-slash'}
              size={18}
              type="font-awesome-5"
            />
          </TouchableOpacity>

          {/* <Divider style={{ backgroundColor: 'white', height: 40 }} /> */}
          <CommonButton
            label="Sign in"
            loading={loading}
            onPress={handleSignInPress}
            style={{ marginTop: scaleV(40) }}
          />
          {/* <Divider style={{ backgroundColor: 'white', height: 100 }} /> */}
        </KeyboardAvoidingView>
      </View>
    </CommonDismissKeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },

  inputIcon: {
    marginRight: 8,
  },

  passwordVisibleToggleButton: {
    alignItems: 'flex-end',
    // backgroundColor: 'black',
    bottom: scaleV(55),
    height: scaleH(44),
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
    marginLeft: scaleH(100),
  },
});
