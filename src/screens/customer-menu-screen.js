import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import avatar from '../../assets/avatar.png';

export const CustomerMenuScreen = ({ navigation }) => {
  const displayName = useSelector(state => state.user.me.displayName);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar rounded showEditButton size="large" source={avatar} />
        <Text h4 style={styles.name}>
          {displayName || 'Thành viên mới'}
        </Text>
      </View>
      <View>
        {list.map(({ leftIcon, title, to }) => (
          <TouchableOpacity onPress={() => navigation.navigate(to)}>
            <ListItem
              bottomDivider
              leftAvatar={
                <View size={16} style={styles.leftIcon}>
                  {leftIcon}
                </View>
              }
              rightIcon={
                <Icon
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
    </View>
  );
};

const list = [
  {
    key: 'profile',
    leftIcon: <Icon name="user" type="font-awesome" />,
    title: 'Profile',
    to: 'Profile',
  },
  {
    key: 'feedback',
    leftIcon: <Icon name="comments-o" type="font-awesome" />,
    title: 'Feedback',
    to: 'Feedback',
  },
  {
    key: 'settings',
    leftIcon: <Icon name="cog" type="font-awesome" />,
    title: 'Settings',
    to: 'Settings',
  },
];

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 24,
    padding: 24,
  },

  container: { flex: 1 },

  leftIcon: {
    // alignItems: 'flex-start',
    width: 24,
  },

  name: {
    marginTop: 16,
  },
});
