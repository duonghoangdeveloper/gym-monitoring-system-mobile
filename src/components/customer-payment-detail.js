import React, { useEffect, useLayoutEffect } from 'react';
import { Button, Tab, Text, View } from 'react-native';

import { CommonListItem } from './common-list-item';

export const CustomerPaymentDetailScreen = ({ navigation }) => (
  <View>
    <CommonListItem
      detail="60 days"
      label="Expired"
      showSeparator="true"
      type="detail"
    />
    <CommonListItem
      detail="22/12/2021"
      label="Expired Date"
      showSeparator="true"
      type="detail"
    />
    <CommonListItem
      detail="10 packs"
      label="Total Package Buy"
      showSeparator="true"
      type="detail"
    />
    <CommonListItem
      detail="20,000,000đ"
      label="Total spend"
      showSeparator="true"
      type="detail"
    />
  </View>
);
