import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';

import { dimension } from '../constants/dimensions';
// import {} from '../constants/types';
import { getTabBarHeight } from './common-tabbar';

type PropTypes = {
  children: React.ReactNode,
  containerStyle: StyleProp<ViewStyle>,
  refreshable?: boolean,
  refreshing?: boolean,
  onRefresh?: () => void,
  showsVerticalScrollIndicator?: boolean,
  refreshControl: React.ReactNode,
};

export const CommonScrollViewAwareScreenHeight = ({
  children,
  containerStyle,
  onRefresh,
  refreshControl,
  refreshable,
  refreshing,
  showsVerticalScrollIndicator = false,
}: PropTypes) => {
  const [isFlex, setFlex] = useState(false);
  const contentHeight = useRef(0);
  const headerHeight = useSelector(state => state.app.headerHeight);
  const tabbarHeight = getTabBarHeight();

  const onLayout = e => {
    contentHeight.current = e.nativeEvent.layout.height;
    checkScrollContentFixLayout();
  };

  const checkScrollContentFixLayout = () => {
    if (isFlex) return;

    if (
      contentHeight.current <=
      DIMENSIONS.SCREEN_HEIGHT - headerHeight - tabbarHeight
    ) {
      setFlex(true);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flex: isFlex ? 1 : 0 }}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={{ flex: 1 }}
    >
      <View onLayout={onLayout} style={[{ flex: 1 }, containerStyle]}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {},
});
