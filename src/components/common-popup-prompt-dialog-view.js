import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getBehavior } from '../common/services';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';
import { CommonButton } from './common-button';
import { CommonInputForm } from './common-input-form';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  defaultValue: ?String,
  keyboardType: ?String,
  regex?: RegExp,
  input?: {},
};

export const CommonPopupPromptDialogView = ({
  onConfirm,
  onDecline,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Ok',
  defaultValue = '',
  keyboardType,
  regex,
  input = {},
}: PropTypes) => {
  const [text, setText] = useState(defaultValue);
  const [error, setError] = useState('');
  // const headerHeight = useSelector(state => state.app.headerHeight);

  const handleConfirm = () => {
    if (regex) {
      if (regex.test(text.toLowerCase())) {
        onConfirm(text);
      } else {
        setError('Wrong input format');
        return;
      }
    }
    onConfirm(text);
  };

  return (
    <KeyboardAvoidingView
      {...getBehavior()}
      keyboardVerticalOffset={120120}
      style={{
        alignItems: 'center',
        height: 420,
        justifyContent: 'center',
        width: '100%',
        // render meaning nothing, but prevent auto fix height of keyboard
        // height: 0,
      }}
    >
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: COLORS.white,
          borderRadius: 4,
          padding: scaleH(16),
        }}
      >
        <Text style={textStyle.widgetItem}>{title}</Text>
        {description && (
          <Text
            style={[textStyle.bodyText, { marginTop: DIMENSIONS.DISTANCE_2 }]}
          >
            {description}
          </Text>
        )}
        <CommonInputForm
          autoFocus
          // label={description}
          containerStyle={{ width: '100%' }}
          error={error}
          keyboardType={keyboardType}
          onChangeText={text => setText(text)}
          value={text}
          {...input}
        />
        <Text style={[textStyle.bodyText, { color: COLORS.error }]}>
          {error}
        </Text>

        <View style={styles.action}>
          <CommonButton
            label={cancelLabel}
            onPress={onDecline}
            style={{ borderRadius: 4, height: 36, minWidth: 100 }}
            theme="error"
          />
          <CommonButton
            label={confirmLabel}
            onPress={handleConfirm}
            style={{ borderRadius: 4, height: 36, minWidth: 100 }}
            theme="success"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  action: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleV(16),
  },
  containerStyle: {
    backgroundColor: 'white',

    borderRadius: 12,

    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center'
    padding: scaleH(16),
    width: '80%',
  },
  item: {
    marginEnd: 4,
    padding: 4,
  },
});
