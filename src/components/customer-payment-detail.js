import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { DATE_FORMAT } from '../common/constants';
import { CommonListItem } from './common-list-item';

export const CustomerPaymentDetailScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [payments, setPayment] = useState([]);
  const [total, setTotal] = useState(0);
  let [expiryDate, setExpiryDate] = useState(0);

  let [dayleftTemp, setDayLeftTemp] = useState(0);
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
                  expiryDate
                }
                paymentPlan {
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
          totalPrice: payments.paymentPlan.price,
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
  payments.forEach(p => (sum += p.paymentPlan.price));
  payments.forEach(p => {
    expiryDate = moment(p.customer.expiryDate).format(DATE_FORMAT);
    dayleftTemp = Math.round(
      (moment(p.customer.expiryDate) - moment(new Date())) /
        (24 * 60 * 60 * 1000)
    );
  });

  console.log(dayleftTemp);
  return (
    <View>
      <CommonListItem
        detail={`
        ${dayleftTemp} days`}
        label="Days Left"
        showSeparator="true"
        type="detail"
      />
      <CommonListItem
        detail={expiryDate}
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
