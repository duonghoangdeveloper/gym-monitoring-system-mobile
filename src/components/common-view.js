import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { CommonDismissKeyboardWrapper } from './common-dismiss-keyboard-wrapper';

export const CommonView = ({ children }) => (
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
        {children}
      </KeyboardAvoidingView>
    </View>
  </CommonDismissKeyboardWrapper>
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
});
