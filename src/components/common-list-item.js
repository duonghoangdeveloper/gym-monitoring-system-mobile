import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// import { getSvg } from '../assets/svgs';
import colors from '../constants/colors';
import { scaleH, scaleV } from '../constants/dimensions';
import { textStyle, textStyleObject } from '../constants/text-styles';
// import { defaultFunction } from '../utils/common';

type PropTypes = {
  icon?: string,
  label?: string,
  nextIcon?: string,
  // onItemPress?: () => void,
  showSeparator?: boolean,
  type: 'text' | 'toggle' | 'detail',
  detail?: string,
  pressable?: boolean,
  containerStyle: StyleProp<ViewStyle>,
  detailStyle: StyleProp<ViewStyle>,
  rightIcon?: string,
};

const ListItem = ({
  containerStyle,
  detail,
  detailStyle,
  icon,
  label = '',
  nextIcon,
  // onItemPress,
  pressable = false,
  rightIcon,
  showSeparator = false,
  type = 'text',
}: PropTypes) => {
  console.log('icon: ', icon);
  console.log('label: ', label);
  console.log('nextIcon: ', nextIcon);
  console.log('showSeparator: ', showSeparator);
  console.log('type: ', type);
  console.log('detail: ', detail);
  console.log('pressable: ', pressable);
  console.log('rightIcon: ', rightIcon);

  const getAction = () => {
    switch (type) {
      case 'text':
        // return getSvg(nextIcon, { fill: colors.dark20 });
        return <FontAwesome5 fill={colors.dark20} name={nextIcon} />;
      case 'toggle':
        return <Switch value />;
      case 'detail':
        return (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <Text
              style={[
                styles.detail,
                nextIcon
                  ? { marginEnd: scaleH(8), ...textStyle.bodyTextBold }
                  : {},
              ]}
            >
              {detail}
            </Text>
            <FontAwesome5 fill={colors.dark20} name={nextIcon} />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      disabled={!pressable}
      // onPress={onItemPress}
      style={[
        styles.container,
        showSeparator ? styles.separator : {},
        containerStyle,
      ]}
    >
      <View style={styles.labelContainer}>
        {icon && (
          <View style={{ marginEnd: scaleH(16), width: scaleH(16) }}>
            {/* {getSvg(icon, { fill: colors.dark20 })} */}
            <FontAwesome5 fill={colors.dark20} name={icon} />
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
        {rightIcon && (
          <View style={{ marginEnd: scaleH(16), width: scaleH(16) }}>
            {/* {getSvg(rightIcon, { fill: colors.dark20 })} */}
            <FontAwesome5 fill={colors.dark20} name={rightIcon} />
          </View>
        )}
      </View>
      {getAction()}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    alignSelf: 'stretch',

    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: scaleH(8),
    // minHeight: scaleH(60),
    paddingVertical: scaleH(16),
  },
  detail: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
    flex: 1,
    textAlign: 'right',
  },
  label: {
    ...textStyleObject.bodyTextBold,
    color: colors.dark20,
    marginEnd: 12,
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separator: {
    borderBottomColor: colors.dark90,
    borderBottomWidth: 1,
  },
});
