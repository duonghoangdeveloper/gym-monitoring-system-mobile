import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CommonListItem } from '../components/common-list-item';
import { CommonView } from '../components/common-view';

export const FeedbackScreen = ({ navigation }) => (
  <CommonView>
    <View style={{ width: 351 }}>
      {list.map(({ icon, key, label, to }) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            navigation.navigate(to, { name: key });
          }}
        >
          <CommonListItem
            detail={
              <Ionicons
                color="black"
                key={key}
                name="ios-arrow-forward"
                size={18}
                style={styles.rightIcon}
                type="font-awesome"
              />
            }
            icon={icon}
            key={key}
            label={label}
            showSeparator="true"
            type="detail"
          />
        </TouchableOpacity>
      ))}
    </View>
  </CommonView>
);

const list = [
  {
    icon: 'pen-alt',
    key: 'gym',
    label: 'Feedback Gym',
    to: 'Feedback Gym',
  },
  {
    icon: 'pen-alt',
    key: 'trainer',
    label: 'Feedback Trainer',
    to: 'Choose Trainer',
  },
  {
    icon: 'pen-alt',
    key: 'manager',
    label: 'Feedback Manager',
    to: 'Choose Manager',
  },
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 24,
    padding: 24,
  },

  leftIcon: {
    // alignItems: 'flex-start',
    width: 24,
  },

  name: {
    marginTop: 41,
  },
});
