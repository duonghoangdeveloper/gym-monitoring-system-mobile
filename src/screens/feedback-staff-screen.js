import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextBox,
  TouchableOpacity,
  View,
} from 'react-native';

import { CommonAvatar } from '../components/common-avatar';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTextItem } from '../components/common-text-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';

export const FeedbackStaffScreen = ({ navigation }) => (
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
        <View style={styles.avatar}>
          <CommonAvatar
            editable={false}
            uri="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/106999191_1328572663997611_2027261738219258471_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=9dpn--hlWcIAX_zCIaK&_nc_ht=scontent.fsgn2-1.fna&oh=9b432da36bc728831cdf878fd7b98acf&oe=5F478B03"
          />
          <Text h4 style={styles.name}>
            {'Trin'}
          </Text>
        </View>
        <View style={styles.inputView}>
          <CommonTextItem
            content="Chúng tôi cần cải thiện điều gì?"
            haveTick={false}
          />
          <CommonInputForm
            style={{
              height: DIMENSIONS.MULTI_TEXT_HEIGHT,
            }}
          />
        </View>
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
  avatar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING_CONTENT,
  },
  button: {
    borderRadius: 24,
  },
  container: {
    height: DIMENSIONS.SCREEN_HEIGHT,
    marginTop: DIMENSIONS.DISTANCE_3,
    padding: DIMENSIONS.PADDING,
    width: DIMENSIONS.SCREEN_WIDTH,
  },
  inputView: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: DIMENSIONS.PADDING_CONTENT,
  },
  name: {
    padding: DIMENSIONS.PADDING_CONTENT,
  },
  text: {
    fontSize: 16,
    height: 60,
    padding: DIMENSIONS.PADDING_CONTENT,
    textAlign: 'center',
    width: '65%',
  },
  title: {
    marginTop: DIMENSIONS.MARGIN_TOP,
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING_CONTENT,
  },
});
