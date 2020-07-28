import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// import {} from '../constants/types';

// layout is stored as module variable
let tabBarLayout = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

// there is exported way to get current tabbar height
export function getTabBarHeight() {
  return tabBarLayout.height;
}

export const CommonTabbar = props => (
  <View
    onLayout={event => {
      tabBarLayout = event.nativeEvent.layout;
    }}
  >
    <BottomTabBar {...props} />
  </View>
);

const styles = StyleSheet.create({});
