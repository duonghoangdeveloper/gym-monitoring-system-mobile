import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import { scaleH, scaleV } from '../constants/dimensions';
import { CommonButtonGroup } from './common-button-group';

type PropTypes = {
  screens: [React.ReactNode],
  labels: [String],
  dots?: [boolean],
};

export const CommonTab = ({
  screens,
  labels,
  dots = new Array(5),
}: PropTypes) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewPagerRef = useRef(null);

  const onTabPress = index => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <CommonButtonGroup
        activeIndex={activeIndex}
        dots={dots}
        labels={labels}
        onItemPress={onTabPress}
      />
      <View
        initialPage={0}
        ref={ref => (viewPagerRef.current = ref)}
        style={{
          marginHorizontal: -scaleH(20),
          marginTop: scaleV(20),
          width: scaleH(311),
        }}
      >
        <View key={activeIndex}>{screens[activeIndex]}</View>
      </View>
    </>
  );
};
