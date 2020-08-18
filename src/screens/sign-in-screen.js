import { useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import * as Font from 'expo-font';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon, Input, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { registerForPushNotificationsAsync } from '../../App';
import eGMSnoText from '../../assets/eGMSnoText.png';
// import { eGMSnoText } from '../assets/picture/eGMSnoText.png';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonView } from '../components/common-view';
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
  console.log(eGMSnoText);

  return (
    <CommonView>
      <View
        style={{
          display: 'flex',
          displayDirection: 'column',
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={{
              uri:
                'https://drive.google.com/uc?id=1Glrj5Kfh1dtu6VTp6PlvS7vxHCu35ctP',
            }}
            style={{
              height: scaleV(180),
              width: scaleH(180),
            }}
          />
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>eGMS</Text>
        </View>
        <View
          style={{
            display: 'flex',
            displayDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
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
          <CommonButton
            loading={loading}
            onPress={() => {
              setLoading(true);
              handleSignInPress();
            }}
            title="Sign In"
          />
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  container: {
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
