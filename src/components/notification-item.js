import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';

// import photo from '../../assets/splash.png';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

type PropTypes = {
  // _id
  // customer {
  //   _id
  //   username
  // }
  // supporter {
  //   _id
  //   username
  // }
  // image {
  //   url
  // }
  // content
  // status
  // createdAt
  // updatedAt

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
    {content.image?.url && (
      <Image source={{ uri: content.image?.url }} style={styles.image} />
    )}
    <View style={styles.content}>
      <Text style={textStyle.bodyTextBold}>{content.content}</Text>
      {/* <View style={styles.subContent}> */}
      <Text style={textStyle.bodyText}>
        {new Date(content.createdAt).toUTCString()}
      </Text>
      <Text style={textStyle.label}>{content.status}</Text>
      {/* </View> */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomColor: COLORS.dark80,
    borderBottomWidth: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: 120,
    paddingHorizontal: DIMENSIONS.DISTANCE_1,
  },
  content: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // justifyContent: 'flex-end',
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
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
