import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import {} from '../constants/types';

const LoadingComponent = () => (
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

export default LoadingComponent;
