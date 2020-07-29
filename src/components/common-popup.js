/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';
import { dimension, scaleH } from '../constants/dimensions';
import { CommonConfirmPopup } from './common-confirm-popup';
import { CommonFadedContainer } from './common-faded-container';
import { CommonModalContainer } from './common-modal-container';
import { CommonPromptDialog } from './common-prompt-dialog';
import { CommonStatusDialog } from './common-status-dialog';

type PropTypes = {
  popupType: String,
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  onDecline: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  grandResponder: Boolean,
};

const POPUP_TYPE = ['prompt', 'success', 'error', 'confirm'];

export const CommonPopUp = (props: PropTypes) => {
  const { grandResponder, modalVisible, onClose, popupType } = props;
  const renderContent = () => {
    switch (popupType) {
      case 'confirm':
        return <CommonConfirmPopup {...props} />;
      case 'success':
      case 'error':
        return <CommonStatusDialog {...props} />;
      case 'prompt':
        return <CommonPromptDialog {...props} />;
      default:
        return null;
    }
  };

  if (!POPUP_TYPE.includes(popupType)) return null;

  return (
    <CommonModalContainer
      grantResponder={grandResponder}
      modalVisible={modalVisible}
      onClose={onClose}
    >
      <View
        // {...getBehavior()}
        style={[
          styles.containerStyle,
          popupType === 'prompt'
            ? { width: '90%' }
            : { backgroundColor: colors.white },
        ]}
      >
        {renderContent()}
      </View>
    </CommonModalContainer>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',

    // backgroundColor: 'white',
    borderRadius: 8,

    justifyContent: 'space-between',
    padding: dimension.DISTANCE_3,
    width: '80%',
  },
});
