import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppApolloWrapper } from './src/components/app-apollo-wrapper';
import { AppFontWrapper } from './src/components/app-font-wrapper';
import { AppNavigation } from './src/components/app-navigation';
import { AppReduxWrapper } from './src/components/app-redux-wrapper';

export default function App() {
  return (
    <AppApolloWrapper>
      <AppReduxWrapper>
        <AppFontWrapper>
          <AppNavigation />
        </AppFontWrapper>
      </AppReduxWrapper>
    </AppApolloWrapper>
  );
}
