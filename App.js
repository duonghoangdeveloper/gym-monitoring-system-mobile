// import Constants from 'expo-constants';
import * as Font from 'expo-font';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

// This refers to the function defined earlier in this guide, in Push Notifications Set Up
import { AppApolloWrapper } from './src/components/app-apollo-wrapper';
import { AppFontWrapper } from './src/components/app-font-wrapper';
import { AppNavigation } from './src/components/app-navigation';
import { AppReduxWrapper } from './src/components/app-redux-wrapper';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowAlert: true,
//   }),
// });
export default function App() {
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     notification => {
  //       setNotification(notification);
  //     }
  //   );
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     response => {
  //       console.log(response);
  //     }
  //   );

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);
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

// export const registerForPushNotificationsAsync = async function registerForPushNotificationsAsync() {
//   let expoPushToken;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     expoPushToken = await Notifications.getExpoPushTokenAsync();
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.createChannelAndroidAsync('default', {
//       name: 'default',
//       priority: 'max',
//       sound: true,
//       vibrate: [0, 250, 250, 250],
//     });
//   }
//   console.log(expoPushToken);
//   return expoPushToken.data;
// };
