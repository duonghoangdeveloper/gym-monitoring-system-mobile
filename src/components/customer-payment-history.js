import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, ListView, Tab, Text, View } from 'react-native';

import { CommonListItem } from './common-list-item';

export const CustomerPaymentHistoryScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [payments, setPayment] = useState([]);
  const [total, setTotal] = useState(0);
  // const fetchPaymentsData = async () => {
  //   try {
  //     const result = await client.query({
  //       query: gql`
  //         query {
  //           payments {
  //             data {
  //               package {
  //                 name
  //                 price
  //                 period
  //                 createdAt
  //               }
  //             }
  //             total
  //           }
  //         }
  //       `,
  //       variables: {
  //         total,
  //       },
  //     });

  //     const fetchedPaymentsData = result?.data?.payments?.data ?? [];
  //     const fetchedPaymentsTotal = result?.data?.payments?.total ?? 0;
  //     setPayment(
  //       fetchedPaymentsData.map(payments => ({
  //         key: payments._id,
  //         ...payments,
  //       }))
  //     );

  //     setTotal(fetchedPaymentsTotal);
  //   } catch (e) {
  //     // Do something
  //   }
  // };
  // useEffect(() => {
  //   fetchPaymentsData();
  // });
  useEffect(() => {
    (async () => {
      try {
        const result = await client.query({
          query: gql`
            query {
              payments {
                data {
                  _id
                  customer {
                    username
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

        const fetchedFeedbacks = result?.data?.payments?.data ?? [];
        setPayment(
          fetchedFeedbacks.map((payment, index) => ({
            key: payment._id,
            no: index + 1,
            ...payment,
          }))
        );
      } catch (e) {
        // Do something
      }
    })();
  }, []);
  console.log(payments._id);
  return (
    <>
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
    </>
  );
};
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
