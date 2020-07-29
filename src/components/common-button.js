import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// import { getSvg } from '../assets/svgs';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

type PropTypes = {
  onPress?: () => void,
  label?: string,
  gradient?: boolean,
  startColor?: string,
  endColor?: string,
  style?: StyleProp<ViewStyle>,
  textColor?: string,
  icon?: string,
  leftIcon?: string,
  rightIcon?: string,
  disable?: boolean,
  buttonType?: 'normal' | 'popup',
  containerStyle?: StyleProp<ViewStyle>,
  theme?: 'primary' | 'secondary' | 'success' | 'error' | 'none',
};

const getColorTheme = (theme, startColor, endColor) => {
  switch (theme) {
    case 'primary':
      return {
        endColor: COLORS.primary,
        startColor: COLORS.primaryLight,
      };
    case 'secondary':
      return {
        endColor: COLORS.secondary,
        startColor: COLORS.secondaryLight,
      };
    case 'success':
      return {
        endColor: COLORS.success,
        startColor: COLORS.successLight,
      };
    case 'error':
      return {
        endColor: COLORS.error,
        startColor: COLORS.errorLight,
      };
    default:
      return {
        endColor,
        startColor,
      };
  }
};

export const CommonButton = ({
  onPress,
  label = '',
  gradient = true,
  startColor = COLORS.primaryLight,
  endColor = COLORS.primary,
  style,
  textColor = COLORS.white,
  iconOnly = false,
  icon = null,
  leftIcon = null,
  rightIcon = null,
  disable = false,
  buttonType = 'normal',
  containerStyle,
  theme = 'primary',
}: PropTypes) => {
  const buttonLabel = label.toUpperCase();
  const colorTheme = getColorTheme(theme, startColor, endColor);

  const renderContent = () => (
    <>
      {leftIcon && (
        <View style={styles.leftIcon}>
          <FontAwesome5 color={textColor} name={leftIcon} />
        </View>
      )}
      <View style={styles.center}>
        {label ? (
          <Text style={[textStyle.label, { color: textColor }]}>
            {buttonLabel}
          </Text>
        ) : (
          <FontAwesome5
            color={textColor}
            name={icon}
            style={[styles.mainIcon, { color: textColor }]}
          />
        )}
      </View>
      {rightIcon && (
        <View style={[styles.rightIcon, { color: textColor }]}>
          <FontAwesome5 color={textColor} name={rightIcon} />
        </View>
      )}
    </>
  );

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
              ? [COLORS.primary, COLORS.primaryLight]
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
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[{ alignSelf: 'stretch' }, containerStyle]}
    >
      <View style={[styles.container, style]}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    top: 0,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    flexDirection: 'row',
    height: scaleH(44),
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  leftIcon: {
    alignItems: 'center',
    // zIndex: 100,
    // backgroundColor: 'red',
    bottom: 0,
    justifyContent: 'center',
    left: scaleH(16),
    position: 'absolute',
    top: 0,
  },
  mainLabel: {},
  popupButton: {
    borderRadius: DIMENSIONS.BORDER_RADIUS,
  },
  rightIcon: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: scaleH(16),
    top: 0,
  },
});
