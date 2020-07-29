import React from 'react';
import { View } from 'react-native';

import { CommonLoadingComponent } from './common-loading-component';

export const AppScreenLoading = () => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <CommonLoadingComponent />
    {/* <Text>Loading</Text> */}
  </View>
);
