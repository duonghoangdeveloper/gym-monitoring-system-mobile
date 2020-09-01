import React from 'react';
import { View } from 'react-native';

import { DATE_TIME_FORMAT } from '../common/constants';
import { CommonListItem } from '../components/common-list-item';
import { CommonView } from '../components/common-view';

export const TrainerDangerousPostureDetail = ({ route }) => {
  const { dangerousPosture } = route.params;
  return (
    <>
      <CommonView>
        {Object.keys(dangerousPosture).map(
          (key, i) =>
            !(key === '_id' || key === '__typename') && (
              <CommonListItem
                detail={dangerousPosture[key]}
                key={i}
                label={key}
                showSeparator="true"
                type="detail"
              />
            )
        )}
      </CommonView>
    </>
  );
};
