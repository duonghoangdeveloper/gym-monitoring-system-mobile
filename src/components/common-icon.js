import * as Icon from '@expo/vector-icons';
import React from 'react';

import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';

export const CommonIcon = ({
  backgroundColor,
  borderRadius,
  color = COLORS.dark20,
  iconStyle,
  onPress,
  size = DIMENSIONS.DISTANCE_3,
  name,
  type = 'FontAwesome5',
}) => {
  const IconComponent = Icon[type];

  if (IconComponent)
    return (
      <IconComponent
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        color={color}
        iconStyle={iconStyle}
        name={name}
        onPress={onPress}
        size={size}
      />
    );
};
