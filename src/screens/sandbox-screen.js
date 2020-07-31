// import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';

import { CommonAvatar } from '../components/common-avatar';
// import { CommonBadgeIcon } from '../components/common-badge-icon';
// import { CommonButton } from '../components/common-button';
// import { CommonButtonGroup } from '../components/common-button-group';
// import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
// import { CommonIcon } from '../components/common-icon';
// import { CommonImageSelector } from '../components/common-image-selector';
// import { CommonInputForm } from '../components/common-input-form';
// import { CommonListItem } from '../components/common-list-item';
// import { CommonLoadingComponent } from '../components/common-loading-component';
// import { CommonModalContainer } from '../components/common-modal-container';
// import { CommonNotFoundComponent } from '../components/common-not-found-component';
// import { CommonAvatar } from '../components/common-avatar';
// import { CommonBadgeIcon } from '../components/common-badge-icon';
// import { CommonButton } from '../components/common-button';
// import { CommonButtonGroup } from '../components/common-button-group';
// import { CommonConfirmPopup } from '../components/common-confirm-popup';
// import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
// import { CommonFadedContainer } from '../components/common-faded-container';
// import { CommonImageSelector } from '../components/common-image-selector';
// import { CommonLoadingComponent } from '../components/common-loading-component';
// import { CommonModalContainer } from '../components/common-modal-container';
// import { CommonNotFoundComponent } from '../components/common-not-found-component';
// import { CommonTextItem } from '../components/common-text-item';
// import { CommonScaleImage } from '../components/common-scale-image';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTab } from '../components/common-tab';
import { CommonTabbar } from '../components/common-tabbar';
import { CommonTextItem } from '../components/common-text-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';

export const SandboxScreen = () => {
  const title = 'Sandsasadsds box';
  const text = 'ABCSDASD';
  const labels = ['A', 'B'];
  const screens = [
    <CommonAvatar uri="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/106999191_1328572663997611_2027261738219258471_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=9dpn--hlWcIAX_zCIaK&_nc_ht=scontent.fsgn2-1.fna&oh=9b432da36bc728831cdf878fd7b98acf&oe=5F478B03" />,
    <CommonAvatar uri="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.0-9/109626485_1337145396473671_6611385215382184486_o.jpg?_nc_cat=110&_nc_sid=8bfeb9&_nc_ohc=LAsCk0nvi68AX-tScDD&_nc_ht=scontent.fsgn2-6.fna&oh=ef3d1cefdc8cd013c1c74a4b4a6ce0b6&oe=5F48AD36" />,
  ];

  return (
    <View>
      <CommonTab labels={labels} screens={screens} />
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
