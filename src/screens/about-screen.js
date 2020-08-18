import React from 'react';
import { Button, Text, View } from 'react-native';

import { CommonInputForm } from '../components/common-input-form';
import { CommonView } from '../components/common-view';

export const AboutScreen = ({ navigation }) => (
  <>
    <CommonView>
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text>About gym</Text>
        <Text>Gym Monitoring System</Text>
        <Text>eGMS</Text>
      </View>
    </CommonView>
  </>
);
