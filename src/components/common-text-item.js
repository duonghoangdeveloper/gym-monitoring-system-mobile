import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
// import { TickIcon } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';
import { dimension, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/textStyles';

type PropTypes = {
  content: string,
  haveTick?: boolean,
  labelStyle: StyleProp<TextStyle>,
};

const TextItem = ({ content, haveTick = true, labelStyle }: PropTypes) => (
  <View style={styles.container}>
    <Text style={[styles.text, labelStyle]}>
      {/* {haveTick && <TickIcon fill={colors.success} />} */}
      {haveTick && <Icon fill={colors.success} name="check-circle" />}
      {haveTick && '  '}
      {content}
    </Text>
  </View>
);

export default TextItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
    marginTop: scaleV(dimension.DISTANCE_3),
  },
});
