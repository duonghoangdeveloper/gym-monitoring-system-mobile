import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { ArrowReturnIcon, getSvg } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons';
import { IconFontAwesome } from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_HEADER_HEIGHT, PLAT_FORM } from '../constants/app';
import colors from '../constants/colors';
import { dimension, scaleH, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/textStyles';
// import { SET_HEADER_HEIGHT } from '../redux/constants';

type PropTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  backType: 'back' | 'exit',
  onBackPress: () => void,
  style: {},
  rightComponent: () => React.ReactNode,
  leftIcon?: string,
  leftComponent?: () => React.ReactNode,
};
// layout is stored as module variable
let headerLayout = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

export function getHeaderHeight() {
  return headerLayout.height;
}

const BackTitle = ({
  backType = 'back',
  haveBack,
  haveRight,
  leftComponent,
  leftIcon,
  onBackPress,
  onRightPress,
  rightComponent,
  rightIcon,
  style,
  title,
}: PropTypes) => {
  const headerHeight = useSelector(state => state.app.headerHeight);
  const dispatch = useDispatch();
  const onLayout = evt => {
    if (headerLayout.height === 0) {
      headerLayout = evt.nativeEvent.layout;
    }
    // migrate later
    if (headerHeight === DEFAULT_HEADER_HEIGHT) {
      dispatch({
        payload: evt.nativeEvent.layout.height,
        type: 'set-header-height',
      });
    }
  };
  const renderRight = () => {
    if (rightIcon) {
      return (
        <TouchableOpacity onPress={onRightPress} style={styles.rightComponent}>
          {/* {getSvg(rightIcon)} */}
          <Icon name="arrow-right" />
        </TouchableOpacity>
      );
    }
    if (rightComponent) {
      if (onRightPress) {
        return (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.rightComponent}
          >
            {rightComponent()}
          </TouchableOpacity>
        );
      }
      return rightComponent();
    }
  };

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.title,
        PLAT_FORM === 'android' ? { marginTop: dimension.DISTANCE_4 } : {},
        style,
      ]}
    >
      <SafeAreaView />

      {haveBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.arrow}>
          {backType === 'back' ? (
            // <ArrowReturnIcon fill={colors.dark20} />
            <IconFontAwesome fill={colors.dark20} name="arrow-left" />
          ) : null}
        </TouchableOpacity>
      )}

      {leftIcon && (
        <TouchableOpacity onPress={onBackPress} style={styles.arrow}>
          {/* {getSvg(leftIcon)} */}
          <Icon name={leftIcon} />
        </TouchableOpacity>
      )}
      {leftComponent && (
        <TouchableOpacity onPress={onBackPress} style={styles.arrow}>
          {leftComponent()}
        </TouchableOpacity>
      )}

      <Text style={styles.titleText}>{title}</Text>
      {haveRight && renderRight()}
    </View>
  );
};
const styles = StyleSheet.create({
  arrow: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 2 * dimension.DISTANCE_4 + 12,
    // paddingTop: 4,
  },
  component: {
    backgroundColor: colors.primary,
  },
  rightComponent: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    top: 0,
    width: 2 * dimension.DISTANCE_4 + 12,
    // paddingTop: 4,
  },
  title: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: dimension.DISTANCE_2,
    paddingBottom: scaleV(dimension.DISTANCE_2),
    paddingTop: dimension.DISTANCE_2,
    // marginHorizontal: -scaleH(dimension.DISTANCE_4),
  },
  titleText: {
    ...textStyleObject.widgetItem,
    color: colors.dark20,
  },
});

export default BackTitle;
