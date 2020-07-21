import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';
import { dimension, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/textStyles';
import Button from './common-button';

type PropTypes = {
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  acceptOnly?: boolean,
};

const ConfirmPopup = ({
  acceptOnly,
  cancelLabel = 'Huỷ',
  confirmLabel = 'Đồng ý',
  description,
  onConfirm,
  onDecline,
  title,
}: PropTypes) => {
  const renderAction = () => {
    if (acceptOnly) {
      return (
        <Button
          label={confirmLabel}
          onPress={onConfirm}
          style={{ borderRadius: 4, marginTop: scaleV(16) }}
        />
      );
    }
    return (
      <View style={styles.action}>
        <Button
          gradient={false}
          label={cancelLabel}
          onPress={onDecline}
          style={{
            borderColor: colors.primary,
            borderRadius: dimension.BORDER_RADIUS,
            borderWidth: 1,
            flex: 1,
            marginEnd: dimension.DISTANCE_3,
          }}
          textColor={colors.primary}
        />
        <Button
          containerStyle={{ flex: 1 }}
          label={confirmLabel}
          onPress={onConfirm}
          style={{ borderRadius: dimension.BORDER_RADIUS }}
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

export default ConfirmPopup;
