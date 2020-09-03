import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/avatar.png';
import { CommonIcon } from '../components/common-icon';
import { CommonView } from '../components/common-view';
import { UPDATE_PROFILE } from '../redux/user/user.types';

export const TrainerMenuScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const me = useSelector(state => state.user.me);
  const client = useApolloClient();
  const toggleSwitch = () => changeOnlineStatus(me._id, !me.isOnline);

  const changeOnlineStatus = async (_id, isOnline) => {
    try {
      const user = await client.query({
        query: gql`
          mutation ChangeOnlineStatus($_id: ID!, $status: Boolean) {
            changeOnlineStatus(_id: $_id, status: $status) {
              isOnline
            }
          }
        `,
        variables: {
          _id,
          status: isOnline,
        },
      });
      console.log(JSON.stringify(user));
      dispatch({
        payload: {
          me: {
            ...me,
            isOnline: user.data.changeOnlineStatus.isOnline,
          },
        },
        type: UPDATE_PROFILE,
      });
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
  };

  return (
    <CommonView>
      <View style={styles.avatarContainer}>
        <Avatar rounded showEditButton size={128} source={avatar} />
        <Text h4 style={styles.name}>
          {me.displayName || 'New member'}
        </Text>
      </View>
      <View>
        <View style={{ marginBottom: 24 }}>
          <TouchableOpacity
            onPress={() => changeOnlineStatus(me._id, !me.isOnline)}
          >
            <ListItem
              bottomDivider
              leftAvatar={
                <View size={16} style={styles.leftIcon}>
                  <CommonIcon color="black" name="bell" size={22} />
                </View>
              }
              rightIcon={
                <Switch
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  thumbColor={me.isOnline ? 'white' : 'white'}
                  trackColor={{ false: '#FF655D', true: '#34B586' }}
                  value={me.isOnline}
                />
              }
              title="Working status"
            />
          </TouchableOpacity>
        </View>

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
