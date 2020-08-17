import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import { DATE_TIME_FORMAT } from '../common/constants';
import { CommonListItem } from './common-list-item';

export const CustomerPaymentHistoryScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [payments, setPayment] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchPaymentsData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query {
            payments {
              data {
                _id
                createdAt
                paymentPlan {
                  name
                  price
                  period
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
      console.log(fetchedPaymentsData);
      setPayment(
        fetchedPaymentsData.map(payment => ({
          key: payment._id,
          ...payment,
          date: moment(payment.createdAt).format(DATE_TIME_FORMAT),
        }))
      );

      setTotal(fetchedPaymentsTotal);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
  };
  useEffect(() => {
    fetchPaymentsData();
  }, []);
  console.log(payments);
  return (
    <>
      <View>
        {payments.map(payment => (
          <CommonListItem
            detail={payment.date}
            label={payment.paymentPlan.name}
            showSeparator="true"
            type="detail"
          />
        ))}
      </View>
    </>
  );
};
