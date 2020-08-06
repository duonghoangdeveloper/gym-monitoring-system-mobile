import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

import { formatDate } from '../common/date';
import { defaultFunction } from '../common/services';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/text-styles';
import { CommonIcon } from './common-icon';

type PropTypes = {
  label: string,
  value: string,
  onChangeText: string => void,
  multiline: boolean,
  containerStyle: StyleProp<ViewStyle>,
  textInputStyle: StyleProp<ViewStyle>,
  placeholder?: string,

  type: 'textinput' | 'calendar' | 'dropdown' | 'password',
  dropDownList?: [{ value: string, label: string }],
  // selectedItem: string,
  autoFocus?: boolean,
  error?: string,
  onTextFocus: () => void,
  keyboardType: 'default' | 'numeric',
  secureTextEntry: boolean,
  defaultValue?: string,
  minLength: number,
  maximumDate?: Date,
  minimumDate?: Date,
  returnKeyType?: string,
};
// const [visible, setVisible] = useState(false);
export const CommonInputForm = ({
  label,
  value,
  onChangeText,
  multiline,
  rightIcon,
  containerStyle,
  textInputStyle,
  placeholder,
  type = 'textinput',
  dropDownList = [],
  autoFocus = false,
  error,
  keyboardType,
  onTextFocus = defaultFunction,
  secureTextEntry,
  defaultValue,
  minLength,
  maximumDate,
  minimumDate,
  returnKeyType,
}: PropTypes) => {
  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date()
  );
  const [inputHover, setInputHover] = useState(false);
  const [pickerValue, setPickerValue] = useState(defaultValue);
  const [visible, setVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const handleTextInputFocus = () => {
    setInputHover(true);

    onTextFocus();
  };
  const handleTextInputBlur = () => {
    setInputHover(false);
  };

  const renderContent = () => {
    switch (type) {
      case 'textinput':
        return (
          <TextInput
            autoFocus={autoFocus}
            defaultValue={value}
            keyboardType={keyboardType}
            multiline={multiline}
            onBlur={handleTextInputBlur}
            onChangeText={onChangeText}
            onFocus={handleTextInputFocus}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            rightIcon={rightIcon}
            secureTextEntry={secureTextEntry}
            style={[
              styles.textInput,
              textInputStyle,
              multiline ? { paddingTop: scaleV(16) } : {},
              inputHover ? { borderColor: COLORS.primary } : {},
              error ? styles.error : {},
            ]}
            textAlignVertical="top"
          />
        );

      case 'calendar':
        return (
          <>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(visible => !visible)}
              style={styles.contentContainer}
            >
              <Text style={styles.text}>{formatDate(value || date)}</Text>
              <CommonIcon name="calendar" />
            </TouchableOpacity>

            <DateTimePickerModal
              date={date}
              isVisible={datePickerVisible}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              mode="date"
              onCancel={() => setDatePickerVisible(false)}
              onConfirm={newDate => {
                setDate(newDate);
                setDatePickerVisible(false);
                if (typeof onChangeText === 'function') {
                  onChangeText(newDate);
                }
              }}
            />
          </>
        );
      case 'dropdown':
        return (
          <RNPickerSelect
            items={dropDownList}
            onValueChange={text => {
              setPickerValue(text);
              if (typeof onChangeText === 'function') {
                onChangeText(text);
              }
            }}
            placeholder={{ label: placeholder }}
            style={{
              inputAndroid: styles.contentContainer,
              inputIOS: styles.contentContainer,
            }}
            useNativeAndroidPickerStyle={false}
            value={pickerValue}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={[containerStyle, type === 'dropdown' ? { zIndex: 2 } : {}]}>
      <Label label={label} minLength={minLength} />
      {renderContent()}
    </View>
  );
};

const Label = ({ label, minLength }) => {
  if (!minLength) {
    return <Text style={styles.label}>{label}</Text>;
  }
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text>min {minLength} characters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.dark80,
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    borderWidth: 1,
    flexDirection: 'row',
    height: scaleH(44),
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(8),
  },
  dropDownItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.dark80,
    flexDirection: 'row',
    height: scaleH(44),
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(16),
  },
  dropDownList: {
    backgroundColor: 'white',
    borderBottomLeftRadius: DIMENSIONS.BORDER_RADIUS,
    borderBottomRightRadius: DIMENSIONS.BORDER_RADIUS,
    borderBottomWidth: 1,
    borderColor: COLORS.dark80,
    borderEndWidth: 1,
    borderStartWidth: 1,
    height: scaleH(160),
    overflow: 'hidden',
  },
  error: {
    borderColor: COLORS.error,
  },

  label: {
    ...textStyleObject.label,
    color: COLORS.dark20,
    marginBottom: scaleV(12),
    marginLeft: scaleH(10),
    marginTop: scaleV(12),
  },
  selectedContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: -scaleH(16),
    paddingHorizontal: scaleH(16),
  },
  selectedText: {
    ...textStyleObject.bodyText,
    color: COLORS.white,
  },
  text: {
    ...textStyleObject.bodyText,
    color: COLORS.dark20,
  },
  textInput: {
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    borderWidth: 1,
    height: scaleH(44),
    paddingHorizontal: scaleH(12),
    paddingVertical: scaleV(12),
    ...textStyleObject.bodyText,
    backgroundColor: COLORS.white,
    borderColor: COLORS.dark80,
    color: COLORS.dark20,
  },
});
