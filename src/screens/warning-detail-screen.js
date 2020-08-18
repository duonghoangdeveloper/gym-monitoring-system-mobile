import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';

import { CommonListItem } from '../components/common-list-item';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';
import { DIMENSIONS } from '../constants/dimensions';

export const WarningDetailScreen = ({ route }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({});
  useEffect(() => {
    fetchData(route.params.item);
  }, []);

  const fetchData = async () => {
    const warningId = route.params.item._id;
    try {
      const result = await client.query({
        query: gql`
          query($warningId: ID!) {
            warning(_id: $warningId) {
              _id
              customer {
                _id
                username
              }
              image {
                url
              }
              content
              status
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          warningId,
        },
      });
      const fetchedWarning = result?.data?.warning ?? [];
      setWarning(fetchedWarning);
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setLoading(false);
  };

  return (
    <CommonScrollViewAwareScreenHeight>
      <Image
        source={{ uri: warning.image?.url ?? '' }}
        style={{
          height: (DIMENSIONS.SCREEN_WIDTH / 16) * 9,
          width: DIMENSIONS.SCREEN_WIDTH,
        }}
      />
      <CommonView>
        {loading && <CommonLoadingComponent />}
        <CommonListItem
          detail={warning.customer?.username ?? 'N/A'}
          label="Customer"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={warning.status}
          label="Status"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={moment(warning.createdAt).format('DD/MM/YYYY, HH:mm')}
          label="Time"
          showSeparator="true"
          type="detail"
        />
        <CommonListItem
          detail={warning.content}
          label="Content"
          showSeparator="true"
          type="detail"
        />
      </CommonView>
    </CommonScrollViewAwareScreenHeight>
  );
};
