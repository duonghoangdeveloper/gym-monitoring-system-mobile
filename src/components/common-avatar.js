import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import avatar from '../../assets/avatar.png';
import { COLORS } from '../constants/colors';
import { scaleH } from '../constants/dimensions';

type PropTypes = {
  uri: string,
  style: StyleProp<ViewStyle>,
  editable?: boolean,
  onAvatarPress?: () => void,
  size?: 'normal' | 'small' | 'xsmall',
};

export const CommonAvatar = ({
  uri = avatar,
  style = {},
  editable = true,
  onAvatarPress,
  size = 'normal',
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
      <Image
        resizeMode="cover"
        source={{ uri }}
        style={[
          {
            borderColor: COLORS.white,
            borderRadius: scaleH(dimension / 2),
            borderWidth: 3,
            height: scaleH(dimension),
            overflow: 'hidden',
            width: scaleH(dimension),
          },
          style,
        ]}
      />
    </TouchableWithoutFeedback>
  );
  if (!editable)
    return (
      <View
        style={{
          height: scaleH(dimension),
          position: 'relative',
          width: scaleH(dimension),
        }}
      >
        {renderContent()}
      </View>
    );
  return (
    <View
      style={{
        height: scaleH(dimension),
        position: 'relative',
        width: scaleH(dimension),
      }}
    >
      <TouchableOpacity onPress={onAvatarPress}>
        {renderContent()}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            borderColor: COLORS.white,
            borderRadius: scaleH(dimension / 2),
            borderWidth: 3,
            bottom: scaleH(dimension / 35),
            color: COLORS.white,
            justifyContent: 'center',
            padding: scaleH(dimension / 20),
            position: 'absolute',
            right: scaleH(dimension / 35),
          }}
        >
          <MaterialIcons
            name="edit"
            style={{
              color: COLORS.white,
              fontSize: dimension / 8,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   avatarImage: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.white,
//     left: 3,
//     position: 'absolute',
//     top: 3,
//   },
//   container: {
//     backgroundColor: COLORS.white,
//     margin: 10,
//     position: 'relative',
//   },
//   editButton: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.white,
//     borderWidth: 3,
//     color: COLORS.white,
//     position: 'absolute',
//   },
// });
