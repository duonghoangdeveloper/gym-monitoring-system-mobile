// import { AppLoading } from 'expo';
// import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

// import { color } from 'react-native-reanimated';
// import { CommonAvatar } from '../components/common-avatar';
// import { CommonBadgeIcon } from '../components/common-badge-icon';
// import { CommonButton } from '../components/common-button';
// import { NotificationItem } from '../components/notification-item';
// import { CommonButtonGroup } from '../components/common-button-group';
// import { CommonConfirmPopup } from '../components/common-confirm-popup';
// import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
// import { CommonFadedContainer } from '../components/common-faded-container';
// import { CommonIcon } from '../components/common-icon';
// import { CommonImageSelector } from '../components/common-image-selector';
// import { CommonInputForm } from '../components/common-input-form';
// import { CommonListItem } from '../components/common-list-item';
// import { CommonLoadingComponent } from '../components/common-loading-component';
// import { CommonModalContainer } from '../components/common-modal-container';
// import { CommonNotFoundComponent } from '../components/common-not-found-component';
// import { CommonScaleImage } from '../components/common-scale-image';
// import { CommonTextItem } from '../components/common-text-item';
// import { CommonPopUp } from '../components/common-popup';
import { COLORS } from '../constants/colors';
// import { DIMENSIONS } from '../constants/dimensions';

export const SandboxScreen = () => {
  const title = 'Sandbox';

  const content1 = {
    description: 'Lorem Ipsum Dolor...',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    note:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    position: 'Area1',
    time: '07/31/2020',
    title: 'Lorem Ipsum Dolor',
  };
  return (
    <ScrollView
    // style={{ backgroundColor: 'black' }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            color: COLORS.dark,
            fontSize: 50,
          }}
        >
          {title}
        </Text>
        {/* <View stye={{ borderColor: 'black', borderWidth: 3 }}> */}
        {/* 
        <NotificationItem
          // cancelLabel
          // confirmLabel
          content={content1}
          // onConfirm
          // onDecline
          // onPress={() => navigation.navigate('NotificationDetail')}
          type="detail"
        /> */}
        {/* </View> */}
      </View>
    </ScrollView>
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

// {/* <CommonButton
//   buttonType="normal"
//   // buttonType= 'popup'
//   disable
//   // disable= {false}
//   // endColor="yellow"
//   gradient
//   // gradient= {false}
//   icon="home"
//   label="test"
//   leftIcon="home"
//   rightIcon="home"
//   // startColor="red"
//   // textColor="white"
//   // theme="primary"
//   // theme="secondary"
//   // theme="success"
//   // theme="error"
//   theme="none"
// />; */}

// <CommonButtonGroup
// activeIndex={0}
// labels={['A', 'B', 'C', 'D']}
// onItemPress
// style
// />

// {/* <CommonPopUp
//   cancelLabel="Decline"
//   confirmLabel="Accept"
//   // onClose= () => void
//   // onConfirm= () => void
//   // onDecline= () => void
//   description="This is a test"
//   grandResponder
//   // grandResponder={false}
//   modalVisible
//   // modalVisible={false}
//   popupType="error"
//   title="TEST"
// />; */}

// <CommonImageSelector
//   data={{
//     key: 'avatar',
//     uri: 'https://reactnative.dev/img/tiny_logo.png',
//   }}
//   // style
//   // onRemovePress
//   // onAddPress
// />;

// {/* <CommonInputForm
//   dropDownList={dataSelector}
//   label="aaaa"
//   placeholder="Drop down"
//   type="dropdown"
// />
// <CommonInputForm label="Input" placeholder="enter name" />
// <CommonInputForm label="Calender" type="calendar" />
// <CommonListItem
//   detail={<CommonIcon name="angle-right" />}
//   icon={<CommonIcon name="music" />}
//   label="daaaa"
//   pressable="true"
//   showSeparator
//   type="detail"
// />
// <CommonListItem
//   detail="adsd"
//   label="daaaa"
//   showSeparator
//   type="detail"
// />
// <CommonListItem detail="adsd" label="daaaa" type="toggle" /> */}

// {/* <CommonModalContainer modalVisible>
//   <CommonButtonGroup
//     activeIndex={0}
//     labels={['A', 'B', 'C', 'D']}
//     onItemPress={n => console.log(n)}
//     style
//   />
// </CommonModalContainer> */}
// {/* <CommonNotFoundComponent /> */}
// {/* <CommonTextItem /> */}
