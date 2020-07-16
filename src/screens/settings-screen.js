import { useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { TOKEN_KEY } from '../common/constants';
import { SIGN_OUT } from '../redux/user/user.types';

export const SettingsScreen = () => {
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
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>Settings</Text>
      <Button onPress={handleSignOutPress} title="Sign out" />
    </View>
  );
};
