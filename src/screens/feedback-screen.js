import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import { CommonListItem } from '../components/common-list-item';

export const FeedbackScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={{ width: 351 }}>
      {list.map(({ icon, key, label, to }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(to, { name: key });
          }}
        >
          <CommonListItem
            detail={
              <Ionicons
                color="black"
                name="ios-arrow-forward"
                size={18}
                style={styles.rightIcon}
                type="font-awesome"
              />
            }
            icon={icon}
            label={label}
            showSeparator="true"
            type="detail"
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
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
