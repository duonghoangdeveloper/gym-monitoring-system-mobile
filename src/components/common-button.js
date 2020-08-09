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
import { DIMENSIONS, scaleH, scaleV } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

type PropTypes = {
  onPress?: () => void,
  shape: 'round' | 'rectangle',
  title?: string,
  gradient?: boolean,
  startColor?: string,
  endColor?: string,
  style?: StyleProp<ViewStyle>,
  textColor?: string,
  icon: React.Node,
  leftIcon?: string,
  rightIcon?: string,
  disable?: boolean,
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
  shape = 'round',
  title = '',
  gradient = true,
  startColor = COLORS.primaryLight,
  endColor = COLORS.primary,
  style,
  textColor = COLORS.white,
  icon,
  leftIcon = null,
  rightIcon = null,
  disable = false,
  theme = 'primary',
}: PropTypes) => {
  const colorTheme = getColorTheme(theme, startColor, endColor);

  return (
    <TouchableOpacity disabled={disable} onPress={onPress}>
      <LinearGradient
        colors={
          gradient || disable
            ? [colorTheme.startColor, colorTheme.endColor]
            : [COLORS.gray]
        }
        end={{ x: 0.5, y: 1 }}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        style={[
          styles.container,
          shape === 'round'
            ? styles.roundButton
            : shape === 'rectangle'
            ? styles.rectangleButton
            : styles.roundButton,
          style,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <View style={styles.center}>
          {title ? (
            <Text style={[textStyle.label, { color: textColor }]}>{title}</Text>
          ) : (
            icon
          )}
        </View>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    paddingHorizontal: DIMENSIONS.DISTANCE_1,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: scaleH(22),
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: scaleH(44),
    minWidth: scaleV(48),
    paddingHorizontal: DIMENSIONS.DISTANCE_3,
    position: 'relative',
  },
  leftIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
    justifyContent: 'center',
    left: DIMENSIONS.DISTANCE_2,
    paddingHorizontal: DIMENSIONS.DISTANCE_2,
    position: 'absolute',
  },
  rectangleButton: {
    borderRadius: DIMENSIONS.BORDER_RADIUS,
  },
  rightIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'green',
    // justifyContent: 'flex-end',
    paddingHorizontal: DIMENSIONS.DISTANCE_2,
    position: 'absolute',
    right: DIMENSIONS.DISTANCE_2,
  },
  roundButton: {
    borderRadius: DIMENSIONS.BORDER_RADIUS_CIRCLE,
  },
});
