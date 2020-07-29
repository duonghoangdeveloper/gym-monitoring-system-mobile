import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { dimension, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { CommonButton } from './common-button';

type PropTypes = {
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  acceptOnly?: boolean,
};

export const CommonPopupConfirmView = ({
  acceptOnly,
  cancelLabel = 'Huỷ',
  confirmLabel = 'Đồng ý',
  description = 'Test description',
  onConfirm,
  onDecline,
  title = 'TEST title',
}: PropTypes) => {
  // console.log('title: ', title);
  // console.log('description: ', description);
  // console.log('cancelLabel: ', cancelLabel);
  // console.log('confirmLabel: ', confirmLabel);
  // console.log('acceptOnly: ', acceptOnly);

  const renderAction = () => {
    if (acceptOnly) {
      return (
        <CommonButton
          label={confirmLabel}
          onPress={onConfirm}
          style={{ borderRadius: 4, marginTop: scaleV(16) }}
        />
      );
    }
    return (
      <View style={styles.action}>
        <CommonButton
          containerStyle={{ flex: 1 }}
          gradient={false}
          label={cancelLabel}
          onPress={onDecline}
          style={{
            flex: 1,
            margin: dimension.DISTANCE_3,
          }}
          textColor={colors.white}
        />
        <CommonButton
          containerStyle={{ flex: 1 }}
          gradient
          label={confirmLabel}
          onPress={onConfirm}
          style={{
            flex: 1,
            margin: dimension.DISTANCE_3,
          }}
          textColor={colors.white}
        />
      </View>
    );
  };
  return (
    <>
      <Text style={[textStyle.widgetItem, { textAlign: 'center' }]}>
        {title}
      </Text>
      <Text style={[textStyle.bodyText, { marginTop: scaleV(12) }]}>
        {description}
      </Text>

      {renderAction()}
    </>
  );
};

const styles = StyleSheet.create({
  action: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dimension.DISTANCE_3,
  },
  item: {
    marginEnd: 4,
    padding: 4,
  },
});
