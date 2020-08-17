import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';

import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';

export const ChangePasswordScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [visibleOldPassword, setVisibleOldPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFinish = async (oldPassword, confirmPassword, newPassword) => {
    if (newPassword.length < 6) {
      Alert.alert('New password must contain at least 6 characters');
    } else if (confirmPassword !== newPassword) {
      Alert.alert('Confirm password is not matched!');
      // setError('Confirm password is not matched!');
    } else if (oldPassword === newPassword) {
      Alert.alert('The old and new passwords can not be the same!');
      // setError('The old and new passwords can not be the same!');
    } else {
      try {
        await client.mutate({
          mutation: gql`
            mutation UpdatePassword(
              $oldPassword: String!
              $newPassword: String!
            ) {
              updatePassword(
                data: { oldPassword: $oldPassword, newPassword: $newPassword }
              ) {
                _id
                username
                displayName
              }
            }
          `,
          variables: {
            newPassword,
            oldPassword,
          },
        });
        await Alert.alert('Update password successfully');
        setTimeout(() => {
          navigation.navigate('Menu');
        }, 400);
      } catch (e) {
        Alert.alert('Old password is wrong!');
      }
    }
  };
  return (
    <>
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
            <CommonInputForm
              label="Old Password"
              onChangeText={text => setOldPassword(text)}
              placeholder="Enter old password"
              secureTextEntry={!visibleOldPassword}
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                flex: 1,

                // justifyContent: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => setVisibleOldPassword(!visibleOldPassword)}
              style={styles.passwordVisibleToggleButton}
            >
              <Icon
                color="#7f7f7f"
                name={visibleOldPassword ? 'eye' : 'eye-slash'}
                size={18}
                type="font-awesome-5"
              />
            </TouchableOpacity>

            <CommonInputForm
              // error={error}
              label="New Password"
              onChangeText={text => setNewPassword(text)}
              placeholder="Enter new password"
              secureTextEntry={!visibleNewPassword}
            />

            <TouchableOpacity
              onPress={() => setVisibleNewPassword(!visibleNewPassword)}
              style={styles.passwordVisibleToggleButton}
            >
              <Icon
                color="#7f7f7f"
                name={visibleNewPassword ? 'eye' : 'eye-slash'}
                size={18}
                type="font-awesome-5"
              />
            </TouchableOpacity>

            <CommonInputForm
              // error={error}
              label="Confirm Password"
              onChangeText={text => setConfirmPassword(text)}
              placeholder="Enter confirm new password"
              secureTextEntry={!visibleConfirmPassword}
              style={{ marginTop: scaleV(10) }}
            />
            <TouchableOpacity
              onPress={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
              style={styles.passwordVisibleToggleButton}
            >
              <Icon
                color="#7f7f7f"
                name={visibleConfirmPassword ? 'eye' : 'eye-slash'}
                size={18}
                type="font-awesome-5"
              />
            </TouchableOpacity>
            <Divider
              style={{ backgroundColor: 'white', height: scaleV(250) }}
            />
            <CommonButton
              onPress={() =>
                onFinish(oldPassword, newPassword, confirmPassword)
              }
              style={{
                alignItems: 'center',

                width: scaleH(311),
              }}
              title="Change Password"
            />
          </KeyboardAvoidingView>
        </View>
      </CommonDismissKeyboardWrapper>
    </>
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

  showButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
