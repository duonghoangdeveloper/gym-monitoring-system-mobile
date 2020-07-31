import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonAvatar } from '../components/common-avatar';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { NotificationItem } from '../components/notification-item';
import { DIMENSIONS } from '../constants/dimensions';
import { NotificationDetailScreen } from './notification-detail-screen';

export const NotificationScreen = ({ navigation }) => {
  const content1 = {
    description: 'Lorem Ipsum Dolor...',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    position: 'Area1',
    time: '07/31/2020',
    title: 'Lorem Ipsum Dolor',
  };
  const content2 = {
    description: 'Lorem Ipsum Dolor...',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    position: 'Area2',
    time: '07/30/2020',
    title: 'Lorem Ipsum Dolor',
  };
  const content3 = {
    description: 'Lorem Ipsum Dolor...',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    position: 'Area3',
    time: '07/29/2020',
    title: 'Lorem Ipsum Dolor',
  };
  const contentArray = [content1, content2, content3];
  // const renderRow = item => (
  //   <View>
  //     <Text style={{ margin: 5, padding: 5 }}>{item.title}</Text>
  //     <Text style={{ margin: 5, padding: 5 }}>{item.description}</Text>
  //     <Text style={{ margin: 5, padding: 5 }}>{item.time}</Text>
  //     <Text style={{ margin: 5, padding: 5 }}>{item.position}</Text>
  //     <Text style={{ margin: 5, padding: 5 }}>{item.image}</Text>
  //   </View>
  // );
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          alignItems: 'stretch',
          alignSelf: 'stretch',
          // flex: 1,
          flexDirection: 'column',
          // justifyContent: 'flex-start',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationDetail')}
        >
          <NotificationItem
            content={content1}
            // onPress={() => navigation.navigate('NotificationDetail')}
            type="box"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationDetail')}
        >
          <NotificationItem
            content={content1}
            // onPress={() => navigation.navigate('NotificationDetail')}
            type="box"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationDetail')}
        >
          <NotificationItem
            content={content1}
            // onPress={() => navigation.navigate('NotificationDetail')}
            type="box"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
