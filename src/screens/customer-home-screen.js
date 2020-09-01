import { FontAwesome5 } from '@expo/vector-icons';
import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CommonButton } from '../components/common-button';
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
          <FontAwesome5 color="#fff" name="bell" size={22} />
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
