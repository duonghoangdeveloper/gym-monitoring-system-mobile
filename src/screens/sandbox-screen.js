// import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';

<<<<<<< HEAD
import { CommonInputForm } from '../components/common-input-form';
import { ListItem } from '../components/common-list-item';
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
import { CommonScaleImage } from '../components/common-scale-image';
import colors from '../constants/colors';
=======
import { CommonAvatar } from '../components/common-avatar';
import { CommonBadgeIcon } from '../components/common-badge-icon';
import { CommonButton } from '../components/common-button';
import { CommonButtonGroup } from '../components/common-button-group';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonImageSelector } from '../components/common-image-selector';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonModalContainer } from '../components/common-modal-container';
import { CommonNotFoundComponent } from '../components/common-not-found-component';
import { CommonTextItem } from '../components/common-text-item';
import { colors } from '../constants/colors';
>>>>>>> master

export const SandboxScreen = () => {
  const title = 'Sandsasadsds box';
  const dataSelector = [
    {
      label: 'Tommy Wiseau',
      value: 1,
    },
    {
      label: 'Arnold Schwarzenneger',
      value: 2,
    },
    {
      label: 'Donald Glover',
      value: 3,
    },
    {
      label: 'Emma Stone',
      value: 4,
    },
  ];
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            color: colors.dark,
            fontSize: 12,
          }}
        >
          {title}
        </Text>
        {/* <View stye={{ borderColor: 'black', borderWidth: 3 }}> */}
<<<<<<< HEAD
=======

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
          endColor={colors.primary}
          gradient
          icon="home"
          iconOnly={false}
          label="test"
          leftIcon="home"
          // onPress
          rightIcon="home"
          startColor={colors.primaryLight}
          style
          textColor={colors.gray}
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
>>>>>>> master
        {/* </View> */}
        <CommonInputForm
          dropDownList={dataSelector}
          label="aaaa"
          type="dropdown"
        />
        <CommonInputForm label="aaaa" placeholder="input name" />
        <CommonInputForm label="aaaa" type="calendar" />
        <ListItem detail="adsd" label="daaaa" pressable="true" type="detail" />
        <ListItem detail="adsd" label="daaaa" type="detail" />
        <ListItem detail="adsd" label="daaaa" type="toggle" />
      </View>
      {/* <CommonScaleImage uri="https://unsplash.it/400/400?image=1" /> */}
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
// endColor={colors.primary}
// gradient
// icon="home"
// iconOnly={false}
// label="test"
// leftIcon="home"
// // onPress
// rightIcon="home"
// startColor={colors.primaryLight}
// style
// textColor={colors.gray}
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
