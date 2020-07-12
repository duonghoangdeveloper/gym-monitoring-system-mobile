import React from 'react';
import { Button, Text, View } from 'react-native';

export const Home = ({ navigation }) => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate('Settings')}
      title="Go to Settings"
    />
  </View>
);
