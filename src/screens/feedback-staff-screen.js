import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Textarea from 'react-native-textarea';

import { CommonAvatar } from '../components/common-avatar';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonPopUp } from '../components/common-popup';
import { CommonTextItem } from '../components/common-text-item';
import { DIMENSIONS, scaleH } from '../constants/dimensions';

export const FeedbackStaffScreen = ({ navigation, route }) => {
  const user = route.params.staff;
  const client = useApolloClient();
  const [content, setContent] = useState('');
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const feedbackStaff = async (staffIds, content) => {
    try {
      if (content.length >= 1 && content.length <= 1000) {
        await client.mutate({
          mutation: gql`
            mutation CreateFeedback($staffIds: [ID!], $content: String!) {
              createFeedback(data: { staffIds: $staffIds, content: $content }) {
                _id
              }
            }
          `,
          variables: {
            content,
            staffIds,
          },
        });

        setPopUpVisible(true);
      } else {
        setErrorVisible(true);
      }
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
  };
  return (
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
          <CommonPopUp
            description="Thanks you so much for the feedback"
            modalVisible={popUpVisible}
            onClose={() => {
              setPopUpVisible(false);
              navigation.goBack();
            }}
            onConfirm={() => {
              setPopUpVisible(false);
              navigation.goBack();
            }}
            popupType="success"
            title="Send Feedback Successfully"
          />
          <CommonPopUp
            description="Please input your feedback"
            modalVisible={errorVisible}
            onClose={() => setErrorVisible(false)}
            onConfirm={() => setErrorVisible(false)}
            popupType="error"
            title="Send Feedback Error"
          />
          <View style={styles.avatar}>
            {user.avatar.url ? (
              <CommonAvatar editable={false} uri={user.avatar.url} />
            ) : (
              <CommonAvatar
                editable={false}
                uri="https://previews.123rf.com/images/jemastock/jemastock1708/jemastock170807787/83959218-muscular-man-flexing-biceps-avatar-fitness-icon-image-vector-illustration-design.jpg"
              />
            )}
            <Text h4 style={styles.name}>
              {user.displayName}
            </Text>
          </View>
          <View style={styles.inputView}>
            <CommonTextItem
              content="What do we need to improve the service?"
              haveTick={false}
              style={styles.title}
            />
            <Textarea
              containerStyle={styles.textareaContainer}
              maxLength={500}
              onChangeText={text => setContent(text)}
              placeholder="Please enter your feedback . . ."
              placeholderTextColor="#c7c7c7"
              style={styles.textarea}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.view}>
            <CommonTextItem
              content="Your feedbacks are very valuable to us"
              haveTick={false}
              labelStyle={styles.text}
            />
            <CommonButton
              onPress={() => feedbackStaff([user._id], content)}
              style={styles.button}
              title="SEND YOUR FEEDBACK"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </CommonDismissKeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING_CONTENT,
  },
  button: {
    borderRadius: 24,
    width: scaleH(270),
  },
  container: {
    height: DIMENSIONS.SCREEN_HEIGHT,
    marginTop: DIMENSIONS.DISTANCE_3,
    padding: DIMENSIONS.PADDING,
    width: DIMENSIONS.SCREEN_WIDTH,
  },
  inputView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    padding: DIMENSIONS.PADDING_CONTENT,
  },
  text: {
    fontSize: 16,
    height: 60,
    padding: DIMENSIONS.PADDING_CONTENT,
    textAlign: 'center',
    width: scaleH(220),
  },
  textarea: {
    color: '#333',
    fontSize: 14,
    // hack android
    height: DIMENSIONS.MULTI_TEXT_HEIGHT * 1.5,
    textAlignVertical: 'top',
  },
  textareaContainer: {
    backgroundColor: '#FFFF',
    height: DIMENSIONS.MULTI_TEXT_HEIGHT * 1.5,
    marginTop: DIMENSIONS.MARGIN,
    padding: 5,
  },
  title: {
    marginTop: DIMENSIONS.MARGIN_TOP,
    textAlign: 'center',
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING,
  },
});
