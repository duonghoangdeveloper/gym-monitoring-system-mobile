import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { COLORS } from '../constants/colors';
import { scaleH, scaleV } from '../constants/dimensions';
import { textStyleObject } from '../constants/text-styles';

/**
 * @implements
 */
type PropTypes = {
  style: StyleProp<ViewStyle>,
  data?: { uri: string, key: string },
  getImage: string => void,
};

export const CommonImageSelector = ({ data, getImage, style }: PropTypes) => {
  const [image, setImage] = useState('');
  // const getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // };
  const _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        getImage(result.uri);
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  if (image.length === 0) {
    return (
      <View
        style={[
          {
            height: 200,
            position: 'relative',
            width: 200,
          },
          style,
        ]}
      >
        <TouchableOpacity
          onPress={_pickImage}
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.dark80,
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {!data.uri ? (
            <View>
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
                  color: COLORS.white,
                  fontSize: 12,
                  marginTop: scaleV(8),
                }}
              >
                ADD IMAGE
              </Text>
            </View>
          ) : (
            <Image
              resizeMode="contain"
              source={{ uri: data.uri }}
              style={[
                {
                  height: 200,
                  overflow: 'hidden',
                  width: 200,
                },
                style,
              ]}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={[
        {
          height: 200,
          margin: 10,
          position: 'relative',
          width: 200,
        },
        style,
      ]}
    >
      <View
        style={{
          borderColor: COLORS.white,
          borderRadius: 5,
          borderWidth: 3,
          bottom: 0,
          // flex: 1,
          flex: 1,
          left: 0,
          position: 'absolute',
        }}
      >
        <TouchableOpacity onPress={_pickImage}>
          <Image
            resizeMode="contain"
            source={{ uri: image }}
            style={[
              {
                height: 200,
                overflow: 'hidden',
                width: 200,
              },
              style,
            ]}
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
//     backgroundColor: COLORS.dark80,
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
//     color: COLORS.white,
//     fontSize: 10,
//     marginTop: scaleV(8),
//   },
// });
