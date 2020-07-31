// import { TickIcon } from '../assets/svgs';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/text-styles';

type PropTypes = {
  content: string,
  haveTick?: boolean,
  labelStyle: StyleProp<TextStyle>,
};

export const CommonTextItem = ({
  content,
  haveTick = true,
  labelStyle,
}: PropTypes) => (
    <View style={styles.container}>
      <Text style={[styles.text, labelStyle]}>
        {/* {haveTick && <TickIcon fill={COLORS.success} />} */}
        {haveTick && <MaterialIcons fill={COLORS.success} name="check-circle" />}
        {haveTick && '  '}
        {content}
      </Text>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    ...textStyleObject.bodyText,
    color: COLORS.dark20,
    marginTop: scaleV(DIMENSIONS.DISTANCE_3),
  },
});
