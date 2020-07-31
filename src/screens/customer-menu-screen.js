import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
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
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  style={styles.rightIcon}
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
    leftIcon: <FontAwesome name="user" />,
    title: 'Profile',
    to: 'Profile',
  },
  {
    leftIcon: <FontAwesome name="comments-o" />,
    title: 'Feedback',
    to: 'Feedback',
  },
  {
    leftIcon: <FontAwesome name="cog" />,
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
