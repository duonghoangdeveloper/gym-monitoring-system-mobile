import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import { CommonAvatar } from '../components/common-avatar';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { CommonTextItem } from '../components/common-text-item';
import { DIMENSIONS } from '../constants/dimensions';

export const FeedbackStaffScreen = ({ navigation, route }) => {
  const user = route.params.staff;
  const client = useApolloClient();
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState(false);

  const feedbackStaff = async (staffIds, content) => {
    try {
      if (content.length >= 1 && content.length <= 1000) {
        await client.mutate({
          mutation: gql`
            mutation CreateFeedback($staffIds: [ID!]!, $content: String!) {
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

        setAlert(true);
        setTimeout(function() {
          setAlert(false);
        }, 1500);
      } else {
        console.log('ERROR');
      }
    } catch (e) {
      console.log(e.message);
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
        <AwesomeAlert
          message="I have a message for you!"
          show={alert}
          title="AwesomeAlert"
        />
        <View style={styles.container}>
          <View style={styles.avatar}>
            {user.avatar ? (
              <CommonAvatar editable={false} uri={user.avatar} />
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
              content="Chúng tôi cần cải thiện điều gì?"
              haveTick={false}
            />
            <CommonInputForm
              onChangeText={text => setContent(text)}
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
            <CommonButton
              label="SEND YOUR FEEDBACK"
              onPress={() => feedbackStaff([user._id], content)}
              style={styles.button}
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
