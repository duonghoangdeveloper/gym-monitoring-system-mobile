import { useApolloClient } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { TOKEN_KEY } from '../common/constants';
import { CommonListItem } from '../components/common-list-item';
import { SIGN_OUT } from '../redux/user/user.types';

export const SettingsScreen = ({ navigation }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleSignOutPress = async () => {
    try {
      // console.log('asdas');
      await client.mutate({
        mutation: gql`
          mutation {
            signOut {
              _id
            }
          }
        `,
      });
    } catch (_) {
      // Do nothing
    }

    await AsyncStorage.removeItem(TOKEN_KEY);
    dispatch({
      type: SIGN_OUT,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 351 }}>
        {list.map(({ icon, label, onItemPress, to }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(to);
              if (onItemPress === 'handleSignOutPress') {
                handleSignOutPress();
              }
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
              onPress={handleSignOutPress}
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
    icon: 'lock',
    key: 'changePassword',
    label: 'Change password',
    to: 'Change Password',
  },
  {
    icon: 'info-circle',
    key: 'about',
    label: 'About gym',
    to: 'About',
  },
  {
    icon: 'sign-out-alt',
    key: 'signOut',
    label: 'Sign out',
    onItemPress: 'handleSignOutPress',
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

  leftIcon: {
    // alignItems: 'flex-start',
    width: 24,
  },

  name: {
    marginTop: 16,
  },
});
