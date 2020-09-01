import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import avatar from '../../assets/avatar.png';
import { CommonView } from '../components/common-view';

export const TrainerMenuScreen = ({ navigation }) => {
  const displayName = useSelector(state => state.user.me.displayName);

  return (
    <CommonView>
      <View style={styles.avatarContainer}>
        <Avatar rounded showEditButton size={128} source={avatar} />
        <Text h4 style={styles.name}>
          {displayName || 'Thành viên mới'}
        </Text>
      </View>
      <View>
        {list.map(({ leftIcon, title, to }) => (
          <TouchableOpacity key={title} onPress={() => navigation.navigate(to)}>
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
    </CommonView>
  );
};

const list = [
  {
    leftIcon: <Icon name="user" type="font-awesome" />,
    title: 'Profile',
    to: 'Profile',
  },
  {
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

  leftIcon: {
    width: 24,
  },

  name: {
    marginTop: 16,
  },
});
