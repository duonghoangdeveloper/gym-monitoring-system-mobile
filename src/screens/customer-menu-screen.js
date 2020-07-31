import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import avatar from '../../assets/avatar.png';
import { CommonListItem } from '../components/common-list-item';

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

      <View style={{ width: 351 }}>
        {list.map(({ icon, label, to }) => (
          <TouchableOpacity onPress={() => navigation.navigate(to)}>
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
};

const list = [
  {
    icon: 'user-edit',
    label: 'Profile',
    to: 'Profile',
  },
  {
    icon: 'pen-alt',
    label: 'Feedback',
    to: 'Feedback',
  },
  {
    icon: 'cog',
    label: 'Settings',
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

  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,

    // justifyContent: 'center',
  },
  icon: { fontSize: 40 },
  leftIcon: {
    // alignItems: 'flex-start',
    width: 24,
  },

  name: {
    marginTop: 16,
  },
});
