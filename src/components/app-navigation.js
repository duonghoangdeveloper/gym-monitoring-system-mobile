import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants/colors';
import { AboutScreen } from '../screens/about-screen';
import { ChangePasswordScreen } from '../screens/change-password-screen';
import { ChooseStaffScreen } from '../screens/choose-staff-screen';
import { CustomerHomeScreen } from '../screens/customer-home-screen';
import { CustomerMenuScreen } from '../screens/customer-menu-screen';
import { CustomerPaymentScreen } from '../screens/customer-payment-screen';
import { FeedbackGymScreen } from '../screens/feedback-gym-screen';
import { FeedbackScreen } from '../screens/feedback-screen';
import { FeedbackStaffScreen } from '../screens/feedback-staff-screen';
import { NotificationScreen } from '../screens/notification-screen';
import { ProfileScreen } from '../screens/profile-screen';
import { SandboxScreen } from '../screens/sandbox-screen';
import { SettingsScreen } from '../screens/settings-screen';
import { SignInScreen } from '../screens/sign-in-screen';
import { TrainerHomeScreen } from '../screens/trainer-home-screen';
import { TrainerMenuScreen } from '../screens/trainer-menu-screen';
import { WarningDetailScreen } from '../screens/warning-detail-screen';
import { WarningScreen } from '../screens/warning-screen';

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
//    |-- TrainerWarningNavigation
//      |-- WarningScreen
//        |-- WarningDetailScreen
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
//        |-- CustomerNotification
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
  <AuthStack.Navigator
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
    <AuthStack.Screen component={SignInScreen} name="Sign In" />
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
      component={TrainerWarningNavigation}
      name="Warning"
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
    <TrainerWarningStack.Screen
      component={WarningDetailScreen}
      name="Warning Detail"
    />
  </TrainerSandboxStack.Navigator>
);

const TrainerHomeStack = createStackNavigator();
const TrainerHomeNavigation = () => (
  <TrainerHomeStack.Navigator>
    <TrainerHomeStack.Screen component={TrainerHomeScreen} name="Home" />
    <TrainerHomeStack.Screen
      component={NotificationScreen}
      name="Notification"
    />
  </TrainerHomeStack.Navigator>
);
const TrainerWarningStack = createStackNavigator();
const TrainerWarningNavigation = () => (
  <TrainerWarningStack.Navigator>
    <TrainerWarningStack.Screen component={WarningScreen} name="Warning" />
    <TrainerWarningStack.Screen
      component={WarningDetailScreen}
      name="Warning Detail"
    />
  </TrainerWarningStack.Navigator>
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
    <CustomerHomeStack.Screen
      component={NotificationScreen}
      name="Notification"
    />
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

// const CustomerFeedbackStack = createStackNavigator();
// const CustomerFeedbackNavigation = () => (
//   <CustomerFeedbackStack.Navigator>
//     <FeedbackScreen.Screen component={FeedbackScreen} name="Feedback" />
//     <FeedbackScreen.Screen component={FeedbackGymScreen} name="FeedbackGym" />
//   </CustomerFeedbackStack.Navigator>
// );

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
      name="Change Password"
    />
    <CustomerMenuStack.Screen
      component={FeedbackGymScreen}
      name="Feedback Gym"
    />
    <CustomerMenuStack.Screen
      component={FeedbackStaffScreen}
      name="Feedback Trainer"
    />
    <CustomerMenuStack.Screen
      component={FeedbackStaffScreen}
      name="Feedback Manager"
    />
    <CustomerMenuStack.Screen
      component={ChooseStaffScreen}
      name="Choose Trainer"
    />
    <CustomerMenuStack.Screen
      component={ChooseStaffScreen}
      name="Choose Manager"
    />
  </CustomerMenuStack.Navigator>
);
