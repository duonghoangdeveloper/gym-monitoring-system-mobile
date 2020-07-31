import React, { useEffect, useLayoutEffect } from 'react';
import { Button, Tab, Text, View } from 'react-native';

import { CommonListItem } from './common-list-item';

export const CustomerPaymentHistoryScreen = ({ navigation }) => (
  <View>
    {list.map(({ detail, label }) => (
      <CommonListItem
        detail={detail}
        label={label}
        showSeparator="true"
        type="detail"
      />
    ))}
  </View>
);
const list = [
  {
    detail: '22/10/2020',
    label: 'Package 1',
  },
  {
    detail: '22/10/2019',
    label: 'Package 2',
  },
  {
    detail: '22/10/2019',
    label: 'Package 3',
  },
  {
    detail: '22/10/2020',
    label: 'Package 4',
  },
  {
    detail: '22/10/2020',
    label: 'Package 1',
  },
  {
    detail: '22/10/2019',
    label: 'Package 1',
  },
];
