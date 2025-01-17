import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { CommonButton } from './common-button';

type PropTypes = {
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
};

export const CommonPopupConfirmView = ({
  cancelLabel,
  confirmLabel,
  description,
  onConfirm,
  onDecline,
  title,
}: PropTypes) => {
  const renderAction = () => {
    if (!cancelLabel) {
      return (
        <CommonButton
          onPress={onConfirm}
          style={{ borderRadius: 4, marginTop: scaleV(16) }}
          title={confirmLabel}
        />
      );
    }
    return (
      <View style={styles.action}>
        <CommonButton
          containerStyle={{ flex: 1 }}
          gradient={false}
          onPress={onDecline}
          style={{
            borderColor: COLORS.primary,
            borderRadius: DIMENSIONS.BORDER_RADIUS_CIRCLE,
            borderWidth: 1,
            flex: 1,
            marginHorizontal: DIMENSIONS.DISTANCE_3,
            // padding: DIMENSIONS.PADDING_CONTENT,
          }}
          textColor={COLORS.primary}
          title={cancelLabel}
        />
        <CommonButton
          containerStyle={{ flex: 1 }}
          gradient
          onPress={onConfirm}
          style={{
            borderColor: COLORS.primary,
            borderRadius: DIMENSIONS.BORDER_RADIUS_CIRCLE,
            borderWidth: 1,
            flex: 1,
            marginHorizontal: DIMENSIONS.DISTANCE_3,
            // padding: DIMENSIONS.PADDING_CONTENT,
          }}
          title={confirmLabel}
          // textColor={COLORS.white}
        />
      </View>
    );
  };
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Text
        style={[
          textStyle.widgetItem,
          { margin: scaleV(12), textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      {/* <Text style={[textStyle.bodyText, { marginTop: scaleV(12) }]}> */}
      <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
        {description}
      </Text>
      {renderAction()}
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: DIMENSIONS.DISTANCE_3,
    paddingHorizontal: DIMENSIONS.DISTANCE_3,
  },
});
