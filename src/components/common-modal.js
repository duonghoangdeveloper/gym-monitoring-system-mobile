import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { CommonDismissKeyboardWrapper } from './common-dismiss-keyboard-wrapper';

type PropTypes = {
  visible?: boolean,
  children: React.ReactNode,
};
export const CommonModal = ({ children, visible = true }: PropTypes) => (
  <CommonDismissKeyboardWrapper>
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <Modal animationType="slide" transparent visible={visible}>
          {children}
        </Modal>
      </KeyboardAvoidingView>
    </View>
  </CommonDismissKeyboardWrapper>
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-start',
  },
});
