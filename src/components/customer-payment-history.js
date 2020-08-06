import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, ListView, Tab, Text, View } from 'react-native';

import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from '../common/constants';
import { CommonListItem } from './common-list-item';

export const CustomerPaymentHistoryScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [payments, setPayment] = useState([]);
  const [total, setTotal] = useState(0);
  // const [packages, setPackage] = useState([]);
  const fetchPaymentsData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query {
            payments {
              data {
                _id
                createdAt
                package {
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
      // console.log('fetchedPaymentsTotal: ', fetchedPaymentsTotal);
      // const fetchedPackageData =
      //   result?.data?.payments?.data?.package?.data ?? [];
      // console.log(fetchedPackageData);
      // setPackage(
      //   fetchedPackageData.map(packages => ({
      //     key: packages._id,
      //     ...packages,
      //     date: moment(packages.createdAt).format(DATE_TIME_FORMAT),
      //   }))
      // );
      setPayment(
        fetchedPaymentsData.map(payment => ({
          key: payment._id,
          ...payment,
          date: moment(payment.createdAt).format(DATE_TIME_FORMAT),
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
  // payments.forEach(p =>
  //   console.log(moment(p.createdAt).format(DATE_TIME_FORMAT))
  // );
  return (
    <>
      <View>
        {payments.map(payment => (
          <CommonListItem
            detail={payment.date}
            label={payment.package.name}
            showSeparator="true"
            type="detail"
          />
        ))}
      </View>
    </>
  );
};
