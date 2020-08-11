import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { CommonAvatar } from '../components/common-avatar';
import { CommonListItem } from '../components/common-list-item';

export const CustomerMenuScreen = ({ navigation }) => {
  const displayName = useSelector(state => state.user.me.displayName);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <CommonAvatar
          editable="false"
          label="string"
          // onAvatarPress
          size="xxsmall"
          uri="https://reactnative.dev/img/tiny_logo.png"
        />
        <Text h4 style={styles.name}>
          {displayName || 'Thành viên mới'}
        </Text>
      </View>

      <View style={{ width: 351 }}>
        {list.map(({ icon, key, label, to }) => (
          <TouchableOpacity key={key} onPress={() => navigation.navigate(to)}>
            <CommonListItem
              detail={
                <Ionicons
                  color="black"
                  key={key}
                  name="ios-arrow-forward"
                  size={18}
                  style={styles.rightIcon}
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
    key: 'profile',
    label: 'Profile',
    to: 'Profile',
  },
  {
    icon: 'pen-alt',
    key: 'feedback',
    label: 'Feedback',
    to: 'Feedback',
  },
  {
    icon: 'cog',
    key: 'settings',
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
