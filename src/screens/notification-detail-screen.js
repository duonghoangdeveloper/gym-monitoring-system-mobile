import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import photo from '../../assets/splash.png';
import { CommonButton } from '../components/common-button';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const NotificationDetailScreen = () => {
  const content = {
    description: 'Lorem Ipsum Dolor...',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    position: 'Area1',
    time: '07/31/2020',
    title: 'Lorem Ipsum Dolor',
  };

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Image
            source={photo}
            style={{
              height: 300,
              marginBottom: DIMENSIONS.DISTANCE_5,
              width: 300,
            }}
          />
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark60,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Title:</Text>
            <Text style={textStyle.bodyText}>{content.title}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark60,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Description:</Text>
            <Text style={textStyle.bodyText}>{content.description}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark60,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Time:</Text>
            <Text style={textStyle.bodyText}>{content.time}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark60,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Position:</Text>
            <Text style={textStyle.bodyText}>{content.position}</Text>
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              borderBottomColor: COLORS.dark60,
              borderBottomWidth: 1,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: DIMENSIONS.DISTANCE_3,
            }}
          >
            <Text style={textStyle.bodyBigTextBold}>Note:</Text>
            <View
              style={{
                borderColor: COLORS.dark80,
                borderWidth: 1,
                padding: DIMENSIONS.DISTANCE_2,
              }}
            >
              <Text style={textStyle.bodyText}>{content.note}</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'stretch',
              alignSelf: 'stretch',
              marginVertical: DIMENSIONS.DISTANCE_3,
            }}
          >
            <CommonButton
              gradient
              label="Feedback"
              // onPress
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
