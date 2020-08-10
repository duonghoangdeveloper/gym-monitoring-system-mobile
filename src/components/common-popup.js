/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { CommonModalContainer } from './common-modal-container';
import { CommonPopupConfirmView } from './common-popup-confirm-view';
import { CommonPopupPromptDialogView } from './common-popup-prompt-dialog-view';
import { CommonPopupStatusDialogView } from './common-popup-status-dialog-view';

type PropTypes = {
  popupType: string,
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  onDecline: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  grandResponder: boolean,
};

const POPUP_TYPE = ['prompt', 'success', 'error', 'confirm'];

export const CommonPopUp = (props: PropTypes) => {
  const { grandResponder, modalVisible, onClose, popupType } = props;

  const renderContent = () => {
    switch (popupType) {
      case 'confirm':
        return <CommonPopupConfirmView {...props} />;
      case 'success':
      case 'error':
        return <CommonPopupStatusDialogView {...props} />;
      case 'prompt':
        return <CommonPopupPromptDialogView {...props} />;
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
            : { backgroundColor: COLORS.white },
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
    alignSelf: 'center',
    borderRadius: 8,
    height: '100%',
    justifyContent: 'space-between',
    padding: DIMENSIONS.DISTANCE_3,
    width: '100%',
  },
});
