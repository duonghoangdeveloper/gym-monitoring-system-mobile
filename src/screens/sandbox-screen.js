// import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';

import { CommonAvatar } from '../components/common-avatar';
import { CommonBadgeIcon } from '../components/common-badge-icon';
import { CommonButton } from '../components/common-button';
import { CommonButtonGroup } from '../components/common-button-group';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonIcon } from '../components/common-icon';
import { CommonImageSelector } from '../components/common-image-selector';
import { CommonInputForm } from '../components/common-input-form';
import { CommonListItem } from '../components/common-list-item';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonModalContainer } from '../components/common-modal-container';
import { CommonNotFoundComponent } from '../components/common-not-found-component';
import { CommonScaleImage } from '../components/common-scale-image';
import { CommonTab } from '../components/common-tab';
import { CommonTextItem } from '../components/common-text-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowAlert: true,
//   }),
// });

export const SandboxScreen = () => {
  //   const [expoPushToken, setExpoPushToken] = useState('');
  //   const [notification, setNotification] = useState(false);
  //   const notificationListener = useRef();
  //   const responseListener = useRef();

  //   useEffect(() => {
  //     registerForPushNotificationsAsync().then(token => {
  //       setExpoPushToken(token);
  //     });

  //     notificationListener.current = Notifications.addNotificationReceivedListener(
  //       notification => {
  //         setNotification(notification);
  //       }
  //     );

  //     responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //       response => {
  //         console.log(response);
  //       }
  //     );

  //     return () => {
  //       Notifications.removeNotificationSubscription(notificationListener);
  //       Notifications.removeNotificationSubscription(responseListener);
  //     };
  //   }, []);

  //   return (
  //     <View
  //       style={{
  //         alignItems: 'center',
  //         flex: 1,
  //         justifyContent: 'space-around',
  //       }}
  //     >
  //       <Text>Your expo push token: {expoPushToken}</Text>
  //       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  //         <Text>
  //           Title: {notification && notification.request.content.title}{' '}
  //         </Text>
  //         <Text>Body: {notification && notification.request.content.body}</Text>
  //         <Text>
  //           Data:{' '}
  //           {notification && JSON.stringify(notification.request.content.data)}
  //         </Text>
  //       </View>
  //       <Button
  //         onPress={async () => {
  //           await sendPushNotification(expoPushToken);
  //         }}
  //         title="sent notification"
  //       />
  //     </View>
  //   );
  // };

  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     body: 'And here is the body!',
  //     data: { data: 'goes here' },
  //     sound: 'default',
  //     title: 'Original Title',
  //     to: expoPushToken,
  //   };

  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     body: JSON.stringify(message),
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //   });
  // }

  // async function registerForPushNotificationsAsync() {
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
  //     const token = await (await Notifications.getExpoPushTokenAsync()).data;
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
  // }

  const title = 'Sandsasadsds box';

  const dataSelector = [
    {
      key: '1',
      label: 'Tommy Wiseau',
      value: 1,
    },
    {
      key: '2',
      label: 'Arnold Schwarzenneger',
      value: 2,
    },
    {
      key: '3',
      label: 'Donald Glover',
      value: 3,
    },
    {
      key: '4',
      label: 'Emma Stone',
      value: 4,
    },
  ];

  return (
    <View>
      <ScrollView>
        <CommonAvatar
          editable
          label="string"
          // onAvatarPress
          size="xxsmall"
          uri="https://reactnative.dev/img/tiny_logo.png"
        />
        <CommonBadgeIcon
          badgeCount={5}
          // iconProps={[(style = { fontSize: 12 })]}
          name="home"
        />
        <CommonButton
          buttonType="popup"
          containerStyle
          disable={false}
          endColor={COLORS.primary}
          gradient
          icon="home"
          iconOnly={false}
          label="test"
          leftIcon="home"
          // onPress
          rightIcon="home"
          startColor={COLORS.primaryLight}
          style
          textColor={COLORS.gray}
          theme="primary"
        />
        <CommonButtonGroup
          activeIndex={0}
          labels={['A', 'B', 'C', 'D']}
          onItemPress={n => console.log(n)}
          style
        />
        <CommonImageSelector
          data={{
            key: 'avatar',
            // uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          // style
          // onRemovePress
          onAddPress={() => console.log(123)}
        />
        <CommonLoadingComponent />
        {/* <CommonModalContainer modalVisible>
        <CommonButtonGroup
          activeIndex={0}
          labels={['A', 'B', 'C', 'D']}
          onItemPress={n => console.log(n)}
          style
        />
      </CommonModalContainer> */}
        {/* <CommonNotFoundComponent /> */}
        {/* <CommonTextItem /> */}
        {/* </View> */}
        <CommonInputForm
          dropDownList={dataSelector}
          label="aaaa"
          placeholder="Drop down"
          type="dropdown"
        />
        <CommonInputForm label="Input" placeholder="enter name" />
        <CommonInputForm label="Calender" type="calendar" />
        <CommonListItem
          detail={<CommonIcon name="angle-right" />}
          icon={<CommonIcon name="music" />}
          label="daaaa"
          pressable="true"
          showSeparator
          type="detail"
        />
        <CommonListItem
          detail="adsd"
          label="daaaa"
          showSeparator
          type="detail"
        />
        <CommonListItem detail="adsd" label="daaaa" type="toggle" />
      </ScrollView>
    </View>
  );
};

//     <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 40 }}>
//       Quicksand-Bold
//     </Text>
//     <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 40 }}>
//       Quicksand-Regular
//     </Text>
//     <Text style={{ fontFamily: 'SFUIDisplay-Black', fontSize: 40 }}>
//       SFUIDisplay-Black
//     </Text>
//     <Text style={{ fontFamily: 'SFUIDisplay-Bold', fontSize: 40 }}>
//       SFUIDisplay-Bold
//     </Text>
//     <Text style={{ fontFamily: 'SFUIDisplay-Light', fontSize: 40 }}>
//       SFUIDisplay-Light
//     </Text>
//     <Text style={{ fontFamily: 'SFUIDisplay-Regular', fontSize: 40 }}>
//       SFUIDisplay-Regular
//     </Text>
//     <Text style={{ fontFamily: 'SFUIDisplay-Ultralight', fontSize: 40 }}>
//       SFUIDisplay-Ultralight
//     </Text>
//     <Text style={{ fontSize: 40 }}>Platform Default</Text>

// <CommonAvatar
// editable
// label="string"
// // onAvatarPress
// size="xxsmall"
// uri="https://reactnative.dev/img/tiny_logo.png"
// />

// <CommonBadgeIcon />
// <CommonBadgeIcon
// badgeCount={5}
// // iconProps={[(style = { fontSize: 12 })]}
// name="home"
// />

// <CommonButton
// buttonType="popup"
// containerStyle
// disable={false}
// endColor={COLORS.primary}
// gradient
// icon="home"
// iconOnly={false}
// label="test"
// leftIcon="home"
// // onPress
// rightIcon="home"
// startColor={COLORS.primaryLight}
// style
// textColor={COLORS.gray}
// theme="primary"
// />

// <CommonButtonGroup
// activeIndex={0}
// labels={['A', 'B', 'C', 'D']}
// onItemPress
// style
// />

// <CommonPopupConfirmView
//   acceptOnly={false}
//   acceptOnly
//   cancelLabel="Deny"
//   confirmLabel="Accept"
//   description="Do you wanna built a snow man?"
//   onConfirm
//   onDecline
//   title="Play time"
// />;

// <CommonImageSelector
//   data={{
//     key: 'avatar',
//     uri: 'https://reactnative.dev/img/tiny_logo.png',
//   }}
//   // style
//   // onRemovePress
//   // onAddPress
// />;
