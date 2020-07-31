import React from 'react';
import { Image, Text, View } from 'react-native';

// import photo from '../../assets/splash.png';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

type PropTypes = {
  content: {
    image: string,
    title: string,
    description: string,
    time: string,
    position: string,
    note?: string,
  },
  onPress: () => void,
};

export const NotificationItem = ({ content, onPress }: PropTypes) => (
  <View
    style={{
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: COLORS.errorLight,
      flexDirection: 'row',
      height: 120,
      padding: DIMENSIONS.DISTANCE_3,
    }}
  >
    <Image
      source={{ uri: content.image }}
      style={{
        height: 100,
        marginRight: DIMENSIONS.DISTANCE_3,
        width: 100,
      }}
    />
    <View>
      <Text style={textStyle.widgetTitle}>{content.title}</Text>
      <Text style={textStyle.bodyText}>{content.description}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: DIMENSIONS.DISTANCE_2,
        }}
      >
        <Text style={textStyle.bodyText}>{content.time}</Text>
        <Text style={textStyle.bodyText}>{content.position}</Text>
      </View>
    </View>
  </View>
);
