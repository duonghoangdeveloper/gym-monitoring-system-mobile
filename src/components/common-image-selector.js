import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../constants/colors';
import { scaleH, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/text-styles';

/**
 * @implements
 */
type PropTypes = {
  style: StyleProp<ViewStyle>,
  data?: { uri: string, key: string },
  onRemovePress?: () => void,
  onAddPress: () => void,
};

export const CommonImageSelector = ({
  data,
  onAddPress,
  onRemovePress,
  style,
}: PropTypes) => {
  const handleRemovePress = () => {
    onRemovePress(data.key);
  };
  if (!data?.uri) {
    return (
      <View
        style={[
          {
            height: 100,
            position: 'relative',
            width: 100,
          },
          style,
        ]}
      >
        <TouchableOpacity
          onPress={onAddPress}
          style={{
            alignItems: 'center',
            backgroundColor: colors.dark80,
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <FontAwesome
            name="photo"
            style={{
              color: 'white',
              fontSize: 24,
            }}
          />
          <Text
            style={{
              ...textStyleObject.bodyTextBold,
              color: colors.white,
              fontSize: 12,
              marginTop: scaleV(8),
            }}
          >
            ADD IMAGE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        {
          height: 100,
          margin: 10,
          position: 'relative',
          width: 100,
        },
        style,
      ]}
    >
      <View
        style={{
          borderColor: colors.white,
          borderRadius: 5,
          borderWidth: 3,
          bottom: 0,
          // flex: 1,
          flex: 1,
          left: 0,
          position: 'absolute',
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: data.uri }}
          style={[
            {
              height: 95,
              overflow: 'hidden',
              width: 95,
            },
            style,
          ]}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.primary,
          borderColor: colors.white,
          borderRadius: 50,
          borderWidth: 3,
          color: colors.white,
          height: 28,
          justifyContent: 'center',
          position: 'absolute',
          right: -12,
          top: -12,
          width: 28,
        }}
      >
        <TouchableOpacity onPress={handleRemovePress}>
          <FontAwesome
            name="remove"
            style={{
              color: 'white',
              fontSize: 12,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     height: 120,
//     position: 'relative',
//     width: 120,
//   },
//   empty: {
//     alignItems: 'center',
//     backgroundColor: colors.dark80,
//     borderRadius: 4,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   img: {
//     borderRadius: 4,
//     flex: 1,
//     // ...shadowStyle.ELEVATION_3,
//   },
//   remove: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//   },
//   text: {
//     ...textStyleObject.bodyTextBold,
//     color: colors.white,
//     fontSize: 10,
//     marginTop: scaleV(8),
//   },
// });
