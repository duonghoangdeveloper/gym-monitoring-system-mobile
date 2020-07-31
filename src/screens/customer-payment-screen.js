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
import { CustomerPaymentDetailScreen } from '../components/customer-payment-detail';
import { CustomerPaymentHistoryScreen } from '../components/customer-payment-history';
import { colors } from '../constants/colors';
import { dimension } from '../constants/dimensions';

export const CustomerPaymentScreen = () => {
  const title = 'Sandsasadsds box';
  const text = 'ABCSDASD';
  const labels = ['Details', 'History'];
  const screens = [
    <CustomerPaymentDetailScreen />,
    <CustomerPaymentHistoryScreen />,
  ];

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          marginBottom: 40,
          padding: 32,
        }}
      >
        <CommonTab labels={labels} screens={screens} />
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
