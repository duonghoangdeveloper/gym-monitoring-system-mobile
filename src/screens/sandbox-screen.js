import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import { color } from 'react-native-reanimated';
// import { CommonAvatar } from '../components/common-avatar';
// import { CommonBadgeIcon } from '../components/common-badge-icon';
import { CommonButton } from '../components/common-button';
// import { CommonButtonGroup } from '../components/common-button-group';
// import { CommonConfirmPopup } from '../components/common-confirm-popup';
// import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
// import { CommonFadedContainer } from '../components/common-faded-container';
// import { CommonIcon } from '../components/common-icon';
// import { CommonImageSelector } from '../components/common-image-selector';
// import { CommonInputForm } from '../components/common-input-form';
// import { CommonListItem } from '../components/common-list-item';
import { CommonLoadingComponent } from '../components/common-loading-component';
import { NotificationItem } from '../components/notification-item';
// import { CommonModalContainer } from '../components/common-modal-container';
// import { CommonNotFoundComponent } from '../components/common-not-found-component';
// import { CommonScaleImage } from '../components/common-scale-image';
// import { CommonTextItem } from '../components/common-text-item';
// import { CommonPopUp } from '../components/common-popup';
// import { CommonTab } from '../components/common-tab';
import { COLORS } from '../constants/colors';
// import { DIMENSIONS } from '../constants/dimensions';

export const SandboxScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const title = 'Sandbox';
  const DATA = [
    {
      description: 'Lorem Ipsum Dolor...',
      // image: 'https://reactnative.dev/img/tiny_logo.png',
      // position: 'Area1',
      time: '07/31/2020',
      title: 'Lorem Ipsum Dolor',
    },
    {
      description: 'Lorem Ipsum Dolor...',
      // image: 'https://reactnative.dev/img/tiny_logo.png',
      // position: 'Area2',
      time: '07/30/2020',
      title: 'Lorem Ipsum Dolor',
    },
    {
      description: 'Lorem Ipsum Dolor...',
      // image: 'https://reactnative.dev/img/tiny_logo.png',
      // position: 'Area3',
      time: '07/29/2020',
      title: 'Lorem Ipsum Dolor',
    },
  ];

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NotificationDetail')}
      style={style}
    >
      <NotificationItem content={item} type="box" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.dark,
              fontSize: 30,
            }}
          >
            {title}
          </Text>

          <FlatList
            // ItemSeparatorComponent={
            //   Platform.OS !== 'android' &&
            //   (({ highlighted }) => (
            //     <View
            //       // style={[styles.separator, highlighted && { marginLeft: 0 }]}
            //       style={{ backgroundColor: 'black', marginLeft: 0 }}
            //     />
            //   ))
            // }
            data={DATA}
            extraData={selectedId}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
          <CommonButton
            // icon={<FontAwesome5 color="white" name="home" />}
            icon={<CommonLoadingComponent />}
            // leftIcon={<FontAwesome5 color="white" name="arrow-left" />}
            // rightIcon={<FontAwesome5 color="white" name="arrow-right" />}
            // shape="rectangle"
            // style={{ width: 380 }}
            // title="Click Me"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
