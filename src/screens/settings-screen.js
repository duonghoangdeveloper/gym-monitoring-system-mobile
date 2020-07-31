import { useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { TOKEN_KEY } from '../constants/app';
import { SIGN_OUT } from '../redux/user/user.types';

export const SettingsScreen = ({ navigation }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleSignOutPress = async () => {
    try {
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
    <View>
      <View>
        {list.map(({ leftIcon, onPress, title, to }, i) => (
          <TouchableOpacity key={i} onPress={() => navigation.navigate(to)}>
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

      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Button onPress={handleSignOutPress} title="Sign out" />
      </View>
    </View>
  );
};
const list = [
  {
    leftIcon: <Icon name="lock" type="font-awesome" />,
    title: 'Change password',
    to: 'ChangePassword',
  },
  {
    leftIcon: <Icon name="info-circle" type="font-awesome" />,
    title: 'About gym',
    to: 'About',
  },
  {
    leftIcon: <Icon name="sign-out" type="font-awesome" />,
    title: 'Sign out',
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
