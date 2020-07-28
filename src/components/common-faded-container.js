import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';

// import colors from '../constants/colors';
import { scaleV } from '../constants/dimensions';
// import shadowStyle from '../constants/shadows';

type PropTypes = {
  containerStyle: StyleProp<ViewStyle>,
  duration?: number,
  visible: boolean,
  children: React.ReactNode,
  onClose: () => void,
  grantResponder: boolean,
};

export const CommonFadedContainer = ({
  children,
  containerStyle,
  duration = 300,
  grantResponder,
  onClose,
  visible = false,
}: PropTypes) => {
  const [expose, setExpose] = useState(!visible);
  const animated = useRef(new Animated.Value(0));

  // const show = () => {
  //   Animated.timing(animated.current, {
  //     duration,
  //     toValue: 1,
  //   }).start();
  // };

  const show = () =>
    Animated.timing(animated.current, {
      duration,
      toValue: 1,
      useNativeDriver: false,
    }).start();

  const hide = () =>
    Animated.timing(animated.current, {
      duration,
      toValue: 0,
      useNativeDriver: false,
    }).start(() => setExpose(true));

  useEffect(() => {
    if (visible) {
      show();
      if (expose) {
        setExpose(false);
      }
    } else {
      hide();
    }
  }, [visible]);
  return (
    !expose && (
      <Animated.View
        onResponderGrant={onClose}
        onStartShouldSetResponder={() => grantResponder}
        style={[
          styles.containerStyle,
          containerStyle,
          {
            opacity: animated.current,
          },
        ]}
      >
        {children}
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    paddingTop: scaleV(120),
    position: 'absolute',
    right: 0,
    top: -scaleV(120),
    // ...shadowStyle.ELEVATION_3,
  },
});
