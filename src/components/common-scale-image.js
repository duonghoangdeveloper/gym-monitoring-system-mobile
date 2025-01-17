import React, { useState } from 'react';
import {
  ActivityIndicator,
  // Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageModal from 'react-native-image-modal';

// import FastImage from 'react-native-fast-image';
import { COLORS } from '../constants/colors';

// import ImageModal from './image-modal/index.tsx';

type PropTypes = {
  uri: string,
  fullImage?: boolean,
  containerStyle: StyleProp<ViewStyle>,
};

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator animating />
  </View>
);

export const CommonScaleImage = ({
  containerStyle,
  fullImage = true,
  uri,
}: PropTypes) => {
  const [DIMENSIONS, setDimension] = useState({ height: 460, width: 450 });
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = event => {
    if (containerWidth === 0) {
      setContainerWidth(event.nativeEvent.layout.width);
    }
  };

  const setImageDimension = (width, height) => {
    if (DIMENSIONS.width === 0) {
      setDimension({
        height: (containerWidth * height) / width,
        width: containerWidth,
      });
    }
  };

  return (
    <View onLayout={onLayout} style={containerStyle}>
      {fullImage ? (
        <ImageModal
          onLoadImage={setImageDimension}
          resizeMode="contain"
          source={{ uri }}
          style={{
            height: DIMENSIONS.height,
            width: DIMENSIONS.width,
          }}
        />
      ) : (
        <FastImage
          onLoad={e =>
            setImageDimension(e.nativeEvent.width, e.nativeEvent.height)
          }
          resizeMode="contain"
          source={{ uri }}
          style={{ height: DIMENSIONS.height, width: DIMENSIONS.width }}
        />
      )}

      {DIMENSIONS.width === 0 && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.dark80,
    height: 200,
    justifyContent: 'center',
    width: '100%',
  },
});
