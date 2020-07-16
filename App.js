import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppApolloWrapper } from './src/components/app-apollo-wrapper';
import { AppNavigation } from './src/components/app-navigation';
import { AppReduxWrapper } from './src/components/app-redux-wrapper';

export default function App() {
  console.log('Hello');
  return (
    <AppApolloWrapper>
      <AppReduxWrapper>
        <AppNavigation />
      </AppReduxWrapper>
    </AppApolloWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
