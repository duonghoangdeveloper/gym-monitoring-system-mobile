import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { COLORS } from '../constants/colors';
import { scaleH } from '../constants/dimensions';
// import { textStyleObject } from '../constants/text-styles';
// import { defaultFunction } from '../common/services';

type PropTypes = {
  activeIndex: number,
  labels: [string],
  onItemPress: number => void,
  style?: StyleProp<ViewStyle>,
};

export const CommonButtonGroup = ({
  activeIndex,
  labels,
  onItemPress,
  style = {},
}: PropTypes) => {
  const getRadiusStyle = index => {
    const length = labels.length - 1;
    if (index === 0) {
      return {
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
      };
    }
    if (index === length) {
      return {
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
      };
    }
    return {
      borderRadius: 4,
    };
  };

  const renderContent = (index: number) => {
    if (index === activeIndex) {
      return (
        <LinearGradient
          colors={[COLORS.primaryLight, COLORS.primary]}
          end={{ x: 0.5, y: 1 }}
          key={index}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          style={[styles.activeButton, getRadiusStyle(index)]}
        >
          <Text style={styles.activeLabel}>{labels[index]}</Text>
        </LinearGradient>
      );
    }
    return <Text style={styles.label}>{labels[index]}</Text>;
  };

  return (
    <View style={[styles.container, style]}>
      {labels.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onItemPress(index)}
          style={styles.button}
        >
          {renderContent(index)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activeButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  activeLabel: {
    // ...textStyleObject.bodyText,
    color: COLORS.white,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'stretch',
    borderColor: COLORS.dark80,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    height: scaleH(44),
    overflow: 'hidden',
  },
  label: {
    // ...textStyleObject.bodyText,
    color: COLORS.dark20,
  },
});
