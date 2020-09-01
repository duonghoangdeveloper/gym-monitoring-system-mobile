// import { AppLoading } from 'expo';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { CommonTab } from '../components/common-tab';
import { CustomerPaymentDetailScreen } from '../components/customer-payment-detail';
import { CustomerPaymentHistoryScreen } from '../components/customer-payment-history';

export const CustomerPaymentScreen = () => {
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
