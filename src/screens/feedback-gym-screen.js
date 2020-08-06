import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { CommonTextItem } from '../components/common-text-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';

export const FeedbackGymScreen = ({ navigation }) => (
  <CommonDismissKeyboardWrapper>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{
        alignItems: 'center',
        flex: 1,
        padding: 12,
      }}
    >
      <View style={styles.container}>
        <CommonTextItem
          content="Chúng tôi cần cải thiện điều gì?"
          haveTick={false}
          labelStyle={styles.title}
        />
        <CommonInputForm
          multiline
          numberOfLines={10}
          placeholder="Ý kiến đóng góp của bạn . . ."
          style={styles.textArea}
        />
        <View style={styles.view}>
          <CommonTextItem
            content="Ý kiến đóng góp của bạn rất quý giá đối với chúng tôi"
            haveTick={false}
            labelStyle={styles.text}
          />
          <CommonButton label="SEND YOUR FEEDBACK" style={styles.button} />
        </View>
      </View>
    </KeyboardAvoidingView>
  </CommonDismissKeyboardWrapper>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
  },
  container: {
    height: DIMENSIONS.SCREEN_HEIGHT,
    marginTop: DIMENSIONS.DISTANCE_3,
    padding: DIMENSIONS.PADDING,
    width: DIMENSIONS.SCREEN_WIDTH,
  },
  text: {
    fontSize: 16,
    height: 60,
    padding: DIMENSIONS.PADDING_CONTENT,
    textAlign: 'center',
    width: '65%',
  },
  textArea: {
    height: DIMENSIONS.MULTI_TEXT_HEIGHT,
    textAlignVertical: 'top',
  },
  textAreaContainer: {
    borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5,
  },
  title: {
    marginTop: DIMENSIONS.MARGIN_TOP,
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: DIMENSIONS.SCREEN_HEIGHT,
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING_CONTENT,
  },
});
