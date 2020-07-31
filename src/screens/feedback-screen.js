import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

export const FeedbackScreen = ({ navigation }) => (
  <View style={styles.container}>
    {list.map(({ key, leftIcon, title, to }) => (
      <TouchableOpacity onPress={() => navigation.navigate(to, { name: key })}>
        <ListItem
          bottomDivider
          leftAvatar={
            <View size={16} style={styles.leftIcon}>
              {leftIcon}
            </View>
          }
          rightIcon={
            <Icon
              key={key}
              name="chevron-right"
              size={16}
              style={styles.rightIcon}
              type="font-awesome"
            />
          }
          title={title}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const list = [
  {
    key: 'gym',
    leftIcon: <Icon name="user" type="font-awesome" />,
    title: 'Feedback Gym',
    to: 'Feedback Gym',
  },
  {
    key: 'trainer',
    leftIcon: <Icon name="comments-o" type="font-awesome" />,
    title: 'Feedback Trainer',
    to: 'Choose Trainer',
  },
  {
    key: 'manager',
    leftIcon: <Icon name="comments-o" type="font-awesome" />,
    title: 'Feedback Manager',
    to: 'Choose Manager',
  },
];

const styles = StyleSheet.create({
  container: { flex: 1 },

  leftIcon: {
    // alignItems: 'flex-start',
    width: 24,
  },

  name: {
    marginTop: 41,
  },
});
