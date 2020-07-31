import { useApolloClient } from '@apollo/react-hooks';
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
import { Icon } from 'react-native-elements';

import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';

export const ChangePasswordScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <View
        style={{
          alignItems: 'stretch',
          backgroundColor: 'white',

          flex: 1,
          padding: DIMENSIONS.PADDING,

          // justifyContent: 'center',
        }}
      >
        <CommonInputForm
          label="Old Password"
          placeholder="Enter old password"
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
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,

            // justifyContent: 'center',
          }}
        />

        <CommonInputForm
          label="New Password"
          placeholder="Enter new password"
          rightIcon={
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={(styles.passwordVisibleToggleButton, styles.showButton)}
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
        />

        <CommonInputForm
          label="Confirm Password"
          placeholder="Enter confirm new password"
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
          style={{ marginTop: scaleV(10) }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          // flex: 1,
          // justifyContent: 'center',
        }}
      >
        <CommonButton
          label="Change Password"
          style={{
            alignItems: 'center',
            marginBottom: scaleV(30),
            marginLeft: scaleH(32),

            width: scaleH(311),
          }}
        />
      </View>
    </>
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
