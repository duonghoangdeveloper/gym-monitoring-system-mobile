import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { scaleH, scaleV } from '../constants/dimensions';
// import ViewPager from '../react-native-community/viewpager';
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
      viewPagerRef.current.setPage(index);
      setActiveIndex(index);
    }
  };
  const handlePageSelected = e => {
    const { position } = e.nativeEvent;
    if (position !== activeIndex) {
      setActiveIndex(position);
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
      {/* <ViewPager */}
      <View
        initialPage={0}
        onPageSelected={handlePageSelected}
        ref={ref => (viewPagerRef.current = ref)}
        style={{
          flex: 1,
          marginHorizontal: -scaleH(20),
          marginTop: scaleV(20),
        }}
      >
        {screens.map((screen, index) => (
          <View
            key={index.toString()}
            style={{ paddingHorizontal: scaleH(20) }}
          >
            {screen}
          </View>
        ))}
        {/* </ViewPager> */}
      </View>
    </>
  );
};
