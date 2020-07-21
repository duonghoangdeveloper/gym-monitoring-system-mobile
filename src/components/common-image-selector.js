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
// import { AddImageIcon, RemoveIcon } from '../assets/svgs';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';
import { scaleH, scaleV } from '../constants/dimensions';
import shadowStyle from '../constants/shadows';
import { textStyleObject } from '../constants/textStyles';
import { defaultFunction } from '../utils/common';

/**
 * @implements
 */
type PropTypes = {
  style: StyleProp<ViewStyle>,
  data?: { uri: string, key: string },
  onRemovePress?: () => void,
  onAddPress: () => void,
};

const ImageSelector = ({
  style,
  data,
  onRemovePress = defaultFunction,
  onAddPress,
}: PropTypes) => {
  const handleRemovePress = () => {
    onRemovePress(data.key);
  };
  if (!data || !data.uri) {
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={onAddPress} style={styles.empty}>
          {/* <AddImageIcon /> */}
          <Icon name="add" />
          <Text style={styles.text}>THÊM HÌNH</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.img}>
        <Image
          resizeMode="contain"
          source={{ uri: data.uri }}
          style={{ flex: 1 }}
        />
      </View>

      <TouchableOpacity onPress={handleRemovePress} style={styles.remove}>
        {/* <RemoveIcon /> */}
        <Icon name="remove" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    height: scaleH(130),
    padding: scaleH(10),
    width: scaleH(130),
  },
  empty: {
    alignItems: 'center',
    backgroundColor: colors.dark80,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    borderRadius: 4,
    flex: 1,
    ...shadowStyle.ELEVATION_3,
  },
  remove: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  text: {
    ...textStyleObject.bodyTextBold,
    color: colors.white,
    fontSize: 10,
    marginTop: scaleV(8),
  },
});
