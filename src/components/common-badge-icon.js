import React from 'react';
import { Text, View } from 'react-native';
// import { getSvg } from '@assets/svgs';
import { Icon } from 'react-native-vector-icons';

const BadgeIcon = ({ badgeCount, iconProps, name }) => (
  <View
    style={{
      height: 24,
      margin: 4,
      marginTop: 10,
      width: 24,
    }}
  >
    {/* {getSvg(name, iconProps)} */}
    <Icon name={name} {...iconProps} />
    {badgeCount > 0 && (
      <View
        style={{
          alignItems: 'center',

          backgroundColor: 'red',

          borderRadius: 6,

          height: 12,

          justifyContent: 'center',
          // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
          position: 'absolute',
          right: -6,
          top: -3,
          width: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
          {badgeCount}
        </Text>
      </View>
    )}
  </View>
);
export default BadgeIcon;
