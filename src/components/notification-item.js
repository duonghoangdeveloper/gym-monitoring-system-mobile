import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

type PropTypes = {
  content: {
    image: {
      url: string,
    },
    content: string,
    createAt: string,
    status: string,
  },
  onPress: () => void,
};

export const NotificationItem = ({ content, onPress }: PropTypes) => (
  <View style={styles.container}>
    <Image
      source={{
        uri:
          content.image?.url ??
          'https://drive.google.com/uc?id=1Glrj5Kfh1dtu6VTp6PlvS7vxHCu35ctP',
      }}
      style={styles.image}
    />
    <View style={styles.content}>
      <Text style={textStyle.bodyTextBold}>{content.content}</Text>
      <Text style={textStyle.bodyText}>
        {moment(content.createdAt).format('DD/MM/YYYY, HH:mm')}
      </Text>
      <Text style={textStyle.label}>{content.status}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomColor: COLORS.dark80,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: 120,
    paddingHorizontal: DIMENSIONS.DISTANCE_1,
  },
  content: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  image: {
    alignSelf: 'center',
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    height: scaleH(54),
    justifyContent: 'flex-start',
    width: scaleV(64),
  },
  subContent: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
