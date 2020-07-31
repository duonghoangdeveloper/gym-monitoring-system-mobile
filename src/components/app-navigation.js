import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants/colors';
import { AboutScreen } from '../screens/about-screen';
import { ChangePasswordScreen } from '../screens/change-password-screen';
import { CustomerHomeScreen } from '../screens/customer-home-screen';
import { CustomerMenuScreen } from '../screens/customer-menu-screen';
import { CustomerPaymentScreen } from '../screens/customer-payment-screen';
import { WarningHistoryScreen } from '../screens/customer-warning-history-screen';
import { FeedbackScreen } from '../screens/feedback-screen';
import { ProfileScreen } from '../screens/profile-screen';
import { SandboxScreen } from '../screens/sandbox-screen';
import { SettingsScreen } from '../screens/settings-screen';
import { SignInScreen } from '../screens/sign-in-screen';
import { TrainerHomeScreen } from '../screens/trainer-home-screen';
import { TrainerMenuScreen } from '../screens/trainer-menu-screen';

export const AppNavigation = () => {
  const role = useSelector(state => state.user.me.role);
  return <NavigationContainer>{renderNavigation(role)}</NavigationContainer>;
};

// AppNavigation
//  |-- AuthNavigation
//    |-- SignIn
//
//  |-- TrainerBottomTabNavigation
//    |-- TrainerSandboxNavigation
//      |-- SandboxScreen
//    |-- TrainerHomeNavigation
//      |-- TrainerHome
//    |-- TrainerMenuNavigation
//      |-- TrainerMenu
//      |-- ProfileScreen
//      |-- SettingsScreen
//
//  |-- CustomerBottomTabNavigation
//    |-- CustomerSandboxNavigation
//      |-- SandboxScreen
//    |-- CustomerHomeNavigation
//      |-- CustomerHome
//    |-- CustomerPaymentNavigation
//      |-- CustomerPayment
//    |-- CustomerMenuNavigation
//      |-- CustomerMenu
//      |-- ProfileScreen
//      |-- FeedbackScreen
//      |-- SettingsScreen

const renderNavigation = role => {
  switch (role) {
    case 'CUSTOMER':
      return <CustomerBottomTabNavigation />;
    case 'TRAINER':
      return <TrainerBottomTabNavigation />;
    default:
      return <AuthStackNavigation />;
  }
};

const AuthStack = createStackNavigator();
const AuthStackNavigation = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen component={SignInScreen} name="SignIn" />
  </AuthStack.Navigator>
);

const TrainerBottomTabStack = createBottomTabNavigator();
const TrainerBottomTabNavigation = () => (
  <TrainerBottomTabStack.Navigator>
    <TrainerBottomTabStack.Screen
      component={TrainerSandboxNavigation}
      name="Sandbox"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="box" type="font-awesome-5" />
        ),
      }}
    />
    <TrainerBottomTabStack.Screen
      component={TrainerHomeNavigation}
      name="Home"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="home" type="font-awesome" />
        ),
      }}
    />
    <TrainerBottomTabStack.Screen
      component={TrainerMenuNavigation}
      name="Menu"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="bars" type="font-awesome" />
        ),
      }}
    />
  </TrainerBottomTabStack.Navigator>
);

const TrainerSandboxStack = createStackNavigator();
const TrainerSandboxNavigation = () => (
  <TrainerSandboxStack.Navigator>
    <TrainerSandboxStack.Screen component={SandboxScreen} name="Sandbox" />
  </TrainerSandboxStack.Navigator>
);

const TrainerHomeStack = createStackNavigator();
const TrainerHomeNavigation = () => (
  <TrainerHomeStack.Navigator>
    <TrainerHomeStack.Screen component={TrainerHomeScreen} name="Home" />
  </TrainerHomeStack.Navigator>
);

const TrainerMenuStack = createStackNavigator();
const TrainerMenuNavigation = () => (
  <TrainerMenuStack.Navigator
    options={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <TrainerMenuStack.Screen component={TrainerMenuScreen} name="Menu" />
    <CustomerMenuStack.Screen component={ProfileScreen} name="Profile" />
    <CustomerMenuStack.Screen component={SettingsScreen} name="Settings" />
  </TrainerMenuStack.Navigator>
);

const CustomerBottomTabStack = createBottomTabNavigator();
const CustomerBottomTabNavigation = () => (
  <CustomerBottomTabStack.Navigator>
    <CustomerBottomTabStack.Screen
      component={CustomerSandboxNavigation}
      name="Sandbox"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="box" type="font-awesome-5" />
        ),
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerHomeNavigation}
      name="Home"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="home" type="font-awesome" />
        ),
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerWarningNavigation}
      name="Warning"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="file-text-o" type="font-awesome" />
        ),
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerPaymentNavigation}
      name="Payment"
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons color={color} name="logo-usd" size={24} />
        ),
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerMenuNavigation}
      name="Menu"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="bars" type="font-awesome" />
        ),
      }}
    />
  </CustomerBottomTabStack.Navigator>
);
const CustomerSandboxStack = createStackNavigator();
const CustomerSandboxNavigation = () => (
  <CustomerSandboxStack.Navigator>
    <CustomerSandboxStack.Screen component={SandboxScreen} name="Sandbox" />
  </CustomerSandboxStack.Navigator>
);

const CustomerHomeStack = createStackNavigator();
const CustomerHomeNavigation = () => (
  <CustomerHomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <CustomerHomeStack.Screen component={CustomerHomeScreen} name="Home" />
  </CustomerHomeStack.Navigator>
);

const CustomerPaymentStack = createStackNavigator();
const CustomerPaymentNavigation = () => (
  <CustomerPaymentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <CustomerPaymentStack.Screen
      component={CustomerPaymentScreen}
      name="Payment"
    />
  </CustomerPaymentStack.Navigator>
);

const CustomerWarningHistoryStack = createStackNavigator();
const CustomerWarningNavigation = () => (
  <CustomerWarningHistoryStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <CustomerPaymentStack.Screen
      component={WarningHistoryScreen}
      name="Warning"
    />
  </CustomerWarningHistoryStack.Navigator>
);
const CustomerMenuStack = createStackNavigator();
const CustomerMenuNavigation = () => (
  <CustomerMenuStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <CustomerMenuStack.Screen component={CustomerMenuScreen} name="Menu" />
    <CustomerMenuStack.Screen component={ProfileScreen} name="Profile" />
    <CustomerMenuStack.Screen component={FeedbackScreen} name="Feedback" />
    <CustomerMenuStack.Screen component={SettingsScreen} name="Settings" />
    <CustomerMenuStack.Screen component={AboutScreen} name="About" />
    <CustomerMenuStack.Screen
      component={ChangePasswordScreen}
      name="ChangePassword"
    />
  </CustomerMenuStack.Navigator>
);
