import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CommonIcon } from '../components/common-icon';
import { DIMENSIONS } from '../constants/dimensions';

export const CustomerHomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{ marginRight: DIMENSIONS.DISTANCE_2 }}
        >
          <CommonIcon color="white" name="bell" size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>Customer</Text>
    </View>
  );
};
