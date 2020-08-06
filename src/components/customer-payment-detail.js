import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Tab, Text, View } from 'react-native';

import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from '../common/constants';
import { CommonListItem } from './common-list-item';

export const CustomerPaymentDetailScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [payments, setPayment] = useState([]);
  const [total, setTotal] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  const fetchPaymentsData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query {
            payments {
              data {
                createdAt
                customer {
                  createdAt
                }
                package {
                  name
                  price
                  period
                  createdAt
                }
              }
              total
            }
          }
        `,
        variables: {
          total,
        },
      });

      const fetchedPaymentsData = result?.data?.payments?.data ?? [];
      const fetchedPaymentsTotal = result?.data?.payments?.total ?? 0;
      setPayment(
        fetchedPaymentsData.map(payments => ({
          key: payments._id,
          ...payments,
          totalPrice: payments.package.price,
        }))
      );

      setTotal(fetchedPaymentsTotal);
    } catch (e) {
      // Do something
    }
  };
  useEffect(() => {
    fetchPaymentsData();
  }, []);

  let sum = 0;
  let sumPeriod = 0;
  payments.forEach(p => (sum += p.package.price));
  payments.forEach(p => (sumPeriod += p.package.period));
  let dateCreate = new Date();
  payments.forEach(p => (dateCreate = p.customer.createdAt));
  // console.log(dateCreate);
  const expiredDateTemp = new Date(dateCreate).setDate(
    new Date(dateCreate).getDate() + sumPeriod * 30
  );
  const expiredDate = moment(expiredDateTemp).format(DATE_FORMAT);
  const msDiff = new Date(expiredDateTemp).getTime() - new Date().getTime(); // Future date - current date
  let dayleftTemp = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  let dayLeft = 0;
  if (dayleftTemp < 0) {
    dayleftTemp = 0;
  } else {
    dayLeft = dayleftTemp;
  }
  return (
    <View>
      <CommonListItem
        detail={`
        ${dayLeft} days`}
        label="Days Left"
        showSeparator="true"
        type="detail"
      />
      <CommonListItem
        detail={expiredDate}
        label="Expired Date"
        showSeparator="true"
        type="detail"
      />
      <CommonListItem
        detail={`${total} packs`}
        label="Total Package Buy"
        showSeparator="true"
        type="detail"
      />
      <CommonListItem
        detail={`${formatPrice(sum)}đ`}
        label="Total spend"
        showSeparator="true"
        type="detail"
      />
    </View>
  );
};
const formatPrice = value => {
  const val = (value / 1).toFixed(0).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
