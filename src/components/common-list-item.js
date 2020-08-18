import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
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
import { COLORS } from '../constants/colors';
import { scaleH, scaleV } from '../constants/dimensions';
import { textStyle, textStyleObject } from '../constants/text-styles';
// import { defaultFunction } from '../common/services';

type PropTypes = {
  icon?: React.ReactNode,
  label?: string,
  nextIcon?: string,
  onItemPress?: () => void,
  showSeparator?: boolean,
  type: 'text' | 'toggle' | 'detail',
  detail?: string,
  pressable?: boolean,
  containerStyle: StyleProp<ViewStyle>,
  detailStyle: StyleProp<ViewStyle>,
  rightIcon?: React.ReactNode,
};

export const CommonListItem = ({
  containerStyle,
  detail,
  detailStyle,
  icon,
  label = '',
  nextIcon,
  onItemPress,
  pressable = false,
  rightIcon,
  showSeparator = false,
  type = 'text',
}: PropTypes) => {
  const [enabled, setEnabled] = useState(false);

  const getAction = () => {
    switch (type) {
      case 'text':
        return <FontAwesome5 fill={COLORS.dark20} name={nextIcon} />;
      case 'toggle':
        return (
          <Switch onValueChange={() => setEnabled(!enabled)} value={enabled} />
        );
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
            <FontAwesome5 fill={COLORS.dark20} name={nextIcon} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      disabled={!pressable}
      onPress={onItemPress}
      style={[
        styles.container,
        showSeparator ? styles.separator : {},
        containerStyle,
      ]}
    >
      <View style={styles.labelContainer}>
        {icon && (
          <View style={{ marginEnd: scaleH(10), width: scaleH(16) }}>
            {/* {getSvg(icon, { fill: colors.dark20 })} */}
            <FontAwesome5
              fill={COLORS.dark20}
              name={icon}
              style={{ fontSize: scaleH(13) }}
            />
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
        {rightIcon && (
          <View style={{ marginEnd: scaleH(16), width: scaleH(16) }}>
            {rightIcon}
          </View>
        )}
      </View>
      {getAction()}
    </TouchableOpacity>
  );
};

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
    color: COLORS.dark20,
    flex: 1,
    textAlign: 'right',
  },
  label: {
    ...textStyleObject.bodyTextBold,
    color: COLORS.dark20,
    marginEnd: 12,
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separator: {
    borderBottomColor: COLORS.dark80,
    borderBottomWidth: 1,
  },
});
