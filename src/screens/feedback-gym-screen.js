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
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH } from '../constants/dimensions';

export const FeedbackGymScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [content, setContent] = useState('');
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const feedbackGym = async content => {
    try {
      if (content.length >= 1 && content.length <= 1000) {
        await client.mutate({
          mutation: gql`
            mutation CreateFeedback($content: String!) {
              createFeedback(data: { content: $content }) {
                _id
              }
            }
          `,
          variables: {
            content,
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
            <CommonAvatar
              editable={false}
              uri="https://cdn1.vectorstock.com/i/1000x1000/61/75/gym-fitness-center-icon-bodybuilder-place-with-vector-24216175.jpg"
            />
            <Text>eGMS</Text>
            <CommonTextItem
              content="What do we need to improve the service?"
              haveTick={false}
              labelStyle={styles.title}
            />
          </View>
          <Textarea
            containerStyle={styles.textareaContainer}
            maxLength={500}
            onChangeText={text => setContent(text)}
            placeholder="Please enter your feedback . . ."
            placeholderTextColor="#c7c7c7"
            style={styles.textarea}
            underlineColorAndroid="transparent"
          />
          <View style={styles.view}>
            <CommonTextItem
              content="Your feedbacks are very valuable to us"
              haveTick={false}
              labelStyle={styles.text}
            />
            <CommonButton
              onPress={() => feedbackGym(content)}
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
  text: {
    fontSize: 16,
    height: 60,
    padding: DIMENSIONS.PADDING_CONTENT,
    textAlign: 'center',
    width: scaleH(220),
  },
  textAreaContainer: {
    borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5,
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
  },
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING,
  },
});
