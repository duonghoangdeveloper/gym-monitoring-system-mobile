import React from 'react';
import { Text, View } from 'react-native';
// import { ErrorTickIcon, SuccessTickIcon } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

// import {colors} from '../constants/colors';
import { DIMENSIONS, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { CommonButton } from './common-button';

type PropTypes = {
  title: string,
  description: String,
  confirmLabel: String,
  onConfirm: () => void,
  popupType: 'success' | 'error',
};

export const CommonPopupStatusDialogView = ({
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
          marginTop: DIMENSIONS.DISTANCE_2,
          width: '80%',
        }}
      >
        <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
          {description}
        </Text>
      </View>

      <CommonButton
        label={confirmLabel}
        onPress={onConfirm}
        style={{ borderRadius: 4, marginTop: DIMENSIONS.DISTANCE_3 }}
        theme={getTheme()}
      />
    </>
  );
};
