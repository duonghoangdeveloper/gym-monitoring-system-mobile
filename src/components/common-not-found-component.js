import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

// import { NotFoundIllustration } from '../assets/svgs/illustration';
import { dimension } from '../constants/dimensions';
import { textStyle } from '../constants/textStyles';
import Button from './common-button';

type PropTypes = {
  title: string,
  description: string,
  onBackPress: () => void,
  containerStyle: StyleProp<ViewStyle>,
  haveBackButton: boolean,
};

const NotFoundComponent = ({
  containerStyle,
  description,
  haveBackButton = true,
  onBackPress,
  title,
}: PropTypes) => (
  <View style={[styles.container, containerStyle]}>
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      {/* <NotFoundIllustration /> */}
      <Text>NotFoundIllustration</Text>
      <Text style={textStyle.widgetItem}>{title}</Text>
      <Text style={[textStyle.bodyText, { marginTop: dimension.DISTANCE_2 }]}>
        {description}
      </Text>
    </View>

    {haveBackButton && (
      <Button
        containerStyle={{ marginBottom: dimension.DISTANCE_4 }}
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
    paddingHorizontal: dimension.DISTANCE_4,
  },
});

export default NotFoundComponent;
