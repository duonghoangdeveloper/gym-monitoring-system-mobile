import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { AboutScreen } from '../screens/about-screen';
import { ChangePasswordScreen } from '../screens/change-password-screen';
import { CustomerHomeScreen } from '../screens/customer-home-screen';
import { CustomerMenuScreen } from '../screens/customer-menu-screen';
import { CustomerPaymentScreen } from '../screens/customer-payment-screen';
import { FeedbackScreen } from '../screens/feedback-screen';
import { NotificationDetailScreen } from '../screens/notification-detail-screen';
import { NotificationScreen } from '../screens/notification-screen';
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
//    |-- TrainerNotificationNavigation
//      |-- NotificationScreen
//        |-- NotificationDetailScreen
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
//    |-- CustomerNotificationNavigation
//      |-- NotificationScreen
//        |-- NotificationDetailScreen
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
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="box" />,
      }}
    />
    <TrainerBottomTabStack.Screen
      component={TrainerHomeNavigation}
      name="Home"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="home" />,
      }}
    />
    <TrainerBottomTabStack.Screen
      component={TrainerNotificationNavigation}
      name="Notification"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="bell" />,
      }}
    />
    <TrainerBottomTabStack.Screen
      component={TrainerMenuNavigation}
      name="Menu"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="bars" />,
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
const TrainerNotificationStack = createStackNavigator();
const TrainerNotificationNavigation = () => (
  <TrainerNotificationStack.Navigator>
    <TrainerNotificationStack.Screen
      component={NotificationScreen}
      name="Notification"
    />
    <TrainerNotificationStack.Screen
      component={NotificationDetailScreen}
      name="NotificationDetail"
    />
  </TrainerNotificationStack.Navigator>
);
const TrainerMenuStack = createStackNavigator();
const TrainerMenuNavigation = () => (
  <TrainerMenuStack.Navigator>
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
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="box" />,
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerHomeNavigation}
      name="Home"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="home" />,
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerNotificationNavigation}
      name="Notification"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="bell" />,
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerPaymentNavigation}
      name="Payment"
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome5 color={color} name="dollar-sign" />
        ),
      }}
    />
    <CustomerBottomTabStack.Screen
      component={CustomerMenuNavigation}
      name="Menu"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 color={color} name="bars" />,
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
  <CustomerHomeStack.Navigator>
    <CustomerHomeStack.Screen component={CustomerHomeScreen} name="Home" />
  </CustomerHomeStack.Navigator>
);

const CustomerPaymentStack = createStackNavigator();
const CustomerPaymentNavigation = () => (
  <CustomerPaymentStack.Navigator>
    <CustomerPaymentStack.Screen
      component={CustomerPaymentScreen}
      name="Payment"
    />
  </CustomerPaymentStack.Navigator>
);

const CustomerNotificationStack = createStackNavigator();
const CustomerNotificationNavigation = () => (
  <CustomerNotificationStack.Navigator>
    <CustomerPaymentStack.Screen
      component={NotificationScreen}
      name="Notification"
    />
    <CustomerNotificationStack.Screen
      component={NotificationDetailScreen}
      name="NotificationDetail"
    />
  </CustomerNotificationStack.Navigator>
);
const CustomerMenuStack = createStackNavigator();
const CustomerMenuNavigation = () => (
  <CustomerMenuStack.Navigator>
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
