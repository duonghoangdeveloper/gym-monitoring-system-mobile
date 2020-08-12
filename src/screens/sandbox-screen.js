// import Constants from 'expo-constants';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import { color } from 'react-native-reanimated';
// import { CommonAvatar } from '../components/common-avatar';
// import { CommonBadgeIcon } from '../components/common-badge-icon';
import { CommonButton } from '../components/common-button';
// import { CommonButtonGroup } from '../components/common-button-group';
// import { CommonConfirmPopup } from '../components/common-confirm-popup';
// import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
// import { CommonFadedContainer } from '../components/common-faded-container';
// import { CommonIcon } from '../components/common-icon';
// import { CommonImageSelector } from '../components/common-image-selector';
// import { CommonInputForm } from '../components/common-input-form';
// import { CommonListItem } from '../components/common-list-item';
import { CommonLoadingComponent } from '../components/common-loading-component';
// import { DIMENSIONS } from '../constants/dimensions';
import { CommonTab } from '../components/common-tab';
import { CustomerPaymentDetailScreen } from '../components/customer-payment-detail';
import { CustomerPaymentHistoryScreen } from '../components/customer-payment-history';
// import { NotificationItem } from '../components/notification-item';
// import { CommonModalContainer } from '../components/common-modal-container';
// import { CommonNotFoundComponent } from '../components/common-not-found-component';
// import { CommonScaleImage } from '../components/common-scale-image';
// import { CommonTextItem } from '../components/common-text-item';
// import { CommonPopUp } from '../components/common-popup';
// import { CommonTab } from '../components/common-tab';
import { COLORS } from '../constants/colors';

export const SandboxScreen = ({ navigation }) => {
  const title = 'Sandbox';
  const [refreshing, setRefreshing] = useState(false);
  const labels = ['Details', 'History'];
  const screens = [
    <CustomerPaymentDetailScreen />,
    <CustomerPaymentHistoryScreen />,
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <Text style={styles.title}>{title}</Text>
        <CommonTab labels={labels} screens={screens} />

        <CommonButton
          // icon={<FontAwesome5 color="white" name="home" />}
          icon={<CommonLoadingComponent />}
          // onPress={() => navigation.navigate('Notification Detail')}
          // leftIcon={<FontAwesome5 color="white" name="arrow-left" />}
          // rightIcon={<FontAwesome5 color="white" name="arrow-right" />}
          // shape="rectangle"
          // style={{ width: 380 }}
          // title="Click Me"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const wait = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    alignItems: 'center',
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.dark,
    fontSize: 30,
  },
});
