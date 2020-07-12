import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '../screens/home';
import { Settings } from '../screens/settings';

const Stack = createStackNavigator();

export const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Settings} name="Settings" />
    </Stack.Navigator>
  </NavigationContainer>
);
