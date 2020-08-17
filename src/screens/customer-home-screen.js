import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';

export const CustomerHomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CommonButton
          icon={<CommonIcon color="white" name="bell" />}
          onPress={() => navigation.navigate('Notification')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>Customer</Text>
    </View>
  );
};
