import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

// import { NotFoundIllustration } from '../assets/svgs/illustration';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { CommonButton } from './common-button';

type PropTypes = {
  title: string,
  description: string,
  onBackPress: () => void,
  containerStyle: StyleProp<ViewStyle>,
  haveBackButton: boolean,
};

export const CommonNotFoundComponent = ({
  containerStyle,
  description,
  haveBackButton = true,
  onBackPress,
  title,
}: PropTypes) => (
  <View style={[styles.container, containerStyle]}>
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>NotFoundIllustration</Text>
      <Text style={textStyle.widgetItem}>{title}</Text>
      <Text style={[textStyle.bodyText, { marginTop: DIMENSIONS.DISTANCE_2 }]}>
        {description}
      </Text>
    </View>

    {haveBackButton && (
      <CommonButton
        containerStyle={{ marginBottom: DIMENSIONS.DISTANCE_4 }}
        label="Trở về"
        onPress={onBackPress}
        theme="secondary"
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.DISTANCE_4,
  },
});
