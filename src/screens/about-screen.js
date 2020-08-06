import React from 'react';
import { Button, Text, View } from 'react-native';

import { CommonInputForm } from '../components/common-input-form';
import { CommonView } from '../components/common-view';

export const AboutScreen = ({ navigation }) => (
  <>
    <CommonView>
      <View>
        <Text>About gym</Text>
        <Text>Gym Monitoring System</Text>
      </View>
    </CommonView>
  </>
);
