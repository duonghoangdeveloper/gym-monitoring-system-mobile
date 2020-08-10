import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { COLORS } from '../constants/colors';

// import {} from '../constants/types';

export const CommonLoadingComponent = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
