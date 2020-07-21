import React from 'react';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';
import { pure } from 'recompose';

type PropTypes = {
  children: NodeList,
  onClose: () => void,
  modalVisible: boolean,
  position?: 'center' | 'flex-end',
  animationType?: 'fade' | 'slide',
  grantResponder?: boolean,
  containerStyle: StyleProp<ViewStyle>,
};

const ModalContainer = ({
  animationType = 'fade',
  children,
  containerStyle,
  grantResponder = true,
  modalVisible,
  onClose,
  position = 'center',
}: PropTypes) => {
  const onModalPress = evt => {
    const { nativeEvent } = evt;
    const { locationX, locationY, pageX, pageY } = nativeEvent;
    if (pageX === locationX && pageY === locationY) {
      onClose();
    }
  };
  return (
    <Modal
      animationType={animationType}
      onDismiss={onClose}
      onRequestClose={onClose}
      transparent
      visible={modalVisible}
    >
      {modalVisible && (
        <View
          onResponderGrant={onModalPress}
          onStartShouldSetResponder={() => grantResponder}
          style={[
            {
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,
              justifyContent: position,
            },
            containerStyle,
          ]}
        >
          {children}
        </View>
      )}
    </Modal>
  );
};

export default ModalContainer;
