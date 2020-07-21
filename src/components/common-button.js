import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { getSvg } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons';

import colors from '../constants/colors';
import { scaleH } from '../constants/dimensions';
import { textStyle } from '../constants/textStyles';

type PropTypes = {
  onPress: () => void,
  label: string,
  gradient?: boolean,
  startColor?: string,
  endColor?: string,
  style: StyleProp<ViewStyle>,
  textColor: string,
  iconOnly?: boolean,
  icon?: string,
  leftIcon?: string,
  disable?: boolean,
  buttonType: 'normal' | 'popup',
  containerStyle?: StyleProp<ViewStyle>,
  theme: 'primary' | 'secondary' | 'success' | 'error' | 'none',
};

const getColorTheme = (theme, startColor, endColor) => {
  switch (theme) {
    case 'primary':
      return {
        endColor: colors.primary,
        startColor: colors.primaryLight,
      };
    case 'secondary':
      return {
        endColor: colors.secondary,
        startColor: colors.secondaryLight,
      };
    case 'success':
      return {
        endColor: colors.success,
        startColor: colors.successLight,
      };
    case 'error':
      return {
        endColor: colors.error,
        startColor: colors.errorLight,
      };
    default:
      return {
        endColor,
        startColor,
      };
  }
};

const Button = ({
  onPress,
  label = '',
  gradient = true,
  startColor = colors.primaryLight,
  endColor = colors.primary,
  style,
  textColor = colors.white,
  iconOnly = false,
  icon = null,
  leftIcon = null,
  disable = false,
  buttonType = 'normal',
  containerStyle,
  theme = 'primary',
}: PropTypes) => {
  const buttonLabel = label.toUpperCase();
  const colorTheme = getColorTheme(theme, startColor, endColor);
  if (gradient) {
    return (
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[{ alignSelf: 'stretch' }, containerStyle]}
      >
        <LinearGradient
          colors={
            disable
              ? [colors.dark90, colors.dark80]
              : [colorTheme.startColor, colorTheme.endColor]
          }
          end={{ x: 0.5, y: 1 }}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          style={[
            styles.container,
            style,
            buttonType === 'popup' ? styles.popupButton : {},
          ]}
        >
          {!iconOnly && (
            <Text style={[textStyle.label, { color: textColor }]}>
              {buttonLabel}
            </Text>
          )}
          {/* {getSvg(icon)} */}
          <Icon name={icon} />
          {leftIcon && (
            <View style={styles.leftIcon}>
              {/* {getSvg(leftIcon)} */}
              <Icon name={leftIcon} />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        styles.container,
        style,
        buttonType === 'popup' ? styles.popupButton : {},
      ]}
    >
      {!iconOnly && (
        <Text style={[textStyle.label, { color: textColor }]}>
          {buttonLabel}
        </Text>
      )}
      {/* {getSvg(icon)} */}
      <Icon name={icon} />
      {leftIcon && (
        <View style={styles.leftIcon}>
          {/* {getSvg(leftIcon)} */}
          <Icon name={leftIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: scaleH(22),
    flexDirection: 'row',
    height: scaleH(44),
    justifyContent: 'center',
  },
  leftIcon: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: scaleH(16),
    position: 'absolute',
    top: 0,
  },
  popupButton: {
    borderRadius: 8,
  },
});

export default Button;
