import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import { EditIcon } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons/FontAwesome5';

import colors from '../constants/colors';
import { scaleH } from '../constants/dimensions';
import { textStyle } from '../constants/textStyles';
import { defaultFunction } from '../utils/common';

type PropTypes = {
  uri: string,
  style: StyleProp<ViewStyle>,
  editable?: boolean,
  onAvatarPress?: () => void,
  size?: 'normal' | 'small' | 'xsmall',
  label?: string,
};

const Avatar = ({
  uri,
  style = {},
  editable = false,
  onAvatarPress = defaultFunction,
  size = 'normal',
  label,
}: PropTypes) => {
  const getDimension = () => {
    switch (size) {
      case 'normal':
        return 100;
      case 'small':
        return 48;
      case 'xsmall':
        return 24;
      default:
        return 100;
    }
  };

  const dimension = getDimension();
  const renderContent = () => (
    <TouchableWithoutFeedback onPress={onAvatarPress}>
      <FastImage
        resizeMode="cover"
        source={{ uri }}
        style={[
          {
            borderRadius: scaleH(dimension / 2),
            height: scaleH(dimension),
            overflow: 'hidden',
            width: scaleH(dimension),
          },
          style,
        ]}
      />
    </TouchableWithoutFeedback>
  );
  if (!editable) return renderContent();
  return (
    <>
      <TouchableOpacity onPress={onAvatarPress}>
        {renderContent()}
        <View style={{ bottom: 0, position: 'absolute', right: 0 }}>
          {/* <EditIcon /> */}
          <Icon name="edit" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Avatar;
