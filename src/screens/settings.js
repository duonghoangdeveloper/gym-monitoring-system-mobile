import React from 'react';
import { Button, Text, View } from 'react-native';

export const Settings = ({ navigation }) => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <Text>Settings Screen</Text>
    <Button
      onPress={() => navigation.push('Settings')}
      title="Go to Settings... again"
    />

    <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
    <Button onPress={() => navigation.goBack()} title="Go back" />
  </View>
);
