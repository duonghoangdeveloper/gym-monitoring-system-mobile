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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

import { defaultFunction } from '../common/common';
import { formatDate } from '../common/date';
// import { pure } from 'recompose';
import { colors } from '../constants/colors';
import { dimension, scaleH, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/text-styles';

type PropTypes = {
  label: string,
  value: string,
  onChangeText: string => void,
  multiline: boolean,
  containerStyle: StyleProp<ViewStyle>,
  textInputStyle: StyleProp<ViewStyle>,
  placeholder?: string,
  rightIcon: string,
  type: 'textinput' | 'calendar' | 'dropdown',
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
  const [date, setDate] = useState(new Date());
  const [inputHover, setInputHover] = useState(false);

  const [pickerValue, setPickerValue] = useState(defaultValue);

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
              inputHover ? { borderColor: colors.primary } : {},
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
              {/* <CalendarIcon /> */}
              <FontAwesome5 name="calendar-alt" />
            </TouchableOpacity>

            <DateTimePickerModal
              // date={new Date(value) || new Date()}
              date={date}
              isVisible={datePickerVisible}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              mode="date"
              onCancel={() => setDatePickerVisible(false)}
              onConfirm={newDate => {
                setDate(newDate);
                console.log(newDate);
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
              // onChangeText(text);
              // setPickerValue(text);
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
    backgroundColor: colors.white,
    borderColor: colors.dark60,
    borderRadius: dimension.BORDER_RADIUS,
    borderWidth: 1,
    flexDirection: 'row',
    height: scaleH(40),
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(8),
    width: scaleH(311),
  },
  dropDownItem: {
    alignItems: 'center',
    borderBottomWidth: 1,

    borderColor: colors.dark60,
    flexDirection: 'row',
    height: scaleH(40),
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(16),
  },
  dropDownList: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomWidth: 1,
    borderColor: colors.dark60,
    borderEndWidth: 1,
    borderStartWidth: 1,
    height: scaleH(160),
    overflow: 'hidden',
  },
  error: {
    borderColor: colors.error,
  },

  label: {
    ...textStyleObject.label,
    color: colors.dark20,
    fontSize: scaleV(14),
    lineHeight: scaleV(24),
    marginBottom: scaleV(15),
    marginLeft: scaleV(21),
    paddingTop: scaleV(15),
  },
  rightIcon: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
    flex: 1,
    textAlign: 'right',
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
    color: colors.white,
  },
  text: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
  },
  textInput: {
    borderRadius: 4,
    borderWidth: 1,
    height: scaleH(40),
    paddingHorizontal: scaleH(8),
    width: scaleH(311),
    ...textStyleObject.bodyText,
    backgroundColor: colors.white,
    borderColor: colors.dark60,
    color: colors.dark20,
  },
});
