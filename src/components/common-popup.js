/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';
import { dimension, scaleH } from '../constants/dimensions';
import ConfirmPopup from './common-confirm-popup';
import FadedContainer from './common-faded-container';
import ModalContainer from './common-modal-container';
import PromptDialog from './common-prompt-dialog';
import StatusDialog from './common-status-dialog';

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

const PopUp = (props: PropTypes) => {
  const { grandResponder, modalVisible, onClose, popupType } = props;
  const renderContent = () => {
    switch (popupType) {
      case 'confirm':
        return <ConfirmPopup {...props} />;
      case 'success':
      case 'error':
        return <StatusDialog {...props} />;
      case 'prompt':
        return <PromptDialog {...props} />;

      default:
        return null;
    }
  };

  if (!POPUP_TYPE.includes(popupType)) return null;

  return (
    <ModalContainer
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
    </ModalContainer>
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

export default PopUp;
