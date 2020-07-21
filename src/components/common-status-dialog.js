import React from 'react';
import { Text, View } from 'react-native';
// import { ErrorTickIcon, SuccessTickIcon } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';
import { dimension, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/textStyles';
import Button from './common-button';

type PropTypes = {
  title: string,
  description: String,
  confirmLabel: String,
  onConfirm: () => void,
  popupType: 'success' | 'error',
};

const StatusDialog = ({
  confirmLabel = 'Ok',
  description,
  onConfirm,
  popupType,
  title,
}: PropTypes) => {
  const getIcon = () => {
    if (popupType === 'success') {
      // return <SuccessTickIcon />;
      return <Icon name="check-circle" />;
    }
    // return <ErrorTickIcon />;
    return <Icon name="error" />;
  };

  const getTheme = () => {
    if (popupType === 'success') return 'success';
    return 'error';
  };
  return (
    <>
      <View style={{ position: 'absolute', top: -60 }}>{getIcon()}</View>
      <Text
        style={[textStyle.widgetItem, { marginTop: 60, textAlign: 'center' }]}
      >
        {title}
      </Text>
      <View
        style={{
          alignSelf: 'center',
          marginTop: dimension.DISTANCE_2,
          width: '80%',
        }}
      >
        <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
          {description}
        </Text>
      </View>

      <Button
        label={confirmLabel}
        onPress={onConfirm}
        style={{ borderRadius: 4, marginTop: dimension.DISTANCE_3 }}
        theme={getTheme()}
      />
    </>
  );
};

export default StatusDialog;
