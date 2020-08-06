import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonAvatar } from '../components/common-avatar';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTextItem } from '../components/common-text-item';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const ChooseStaffScreen = ({ navigation, route }) => {
  const pageTitle = route.params.name;

  const pageToNavigate = generatePageToNavigate(pageTitle);
  const header = generateTitle(pageTitle);
  return (
    <CommonDismissKeyboardWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          alignItems: 'flex-start',
          flex: 1,
          padding: 12,
        }}
      >
        <CommonTextItem
          content={header}
          haveTick={false}
          labelStyle={textStyle.bodyTextBold}
        />
        <CommonScrollViewAwareScreenHeight>
          {Users.map(({ avatarUrl, key, name }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(pageToNavigate, { pageTitle })}
            >
              <ListItem
                bottomDivider
                leftAvatar={
                  <CommonAvatar editable={false} size="small" uri={avatarUrl} />
                }
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH,
                }}
                title={name}
              />
            </TouchableOpacity>
          ))}
        </CommonScrollViewAwareScreenHeight>
      </KeyboardAvoidingView>
    </CommonDismissKeyboardWrapper>
  );
};

const Users = [
  {
    avatarUrl:
      'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/106999191_1328572663997611_2027261738219258471_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=9dpn--hlWcIAX_zCIaK&_nc_ht=scontent.fsgn2-1.fna&oh=9b432da36bc728831cdf878fd7b98acf&oe=5F478B03',
    key: 'Trin',
    name: 'Trin',
  },
  {
    avatarUrl:
      'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/106999191_1328572663997611_2027261738219258471_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=9dpn--hlWcIAX_zCIaK&_nc_ht=scontent.fsgn2-1.fna&oh=9b432da36bc728831cdf878fd7b98acf&oe=5F478B03',
    key: 'Trin 1',
    name: 'Trin 1',
  },
  {
    avatarUrl:
      'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/106999191_1328572663997611_2027261738219258471_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=9dpn--hlWcIAX_zCIaK&_nc_ht=scontent.fsgn2-1.fna&oh=9b432da36bc728831cdf878fd7b98acf&oe=5F478B03',
    key: 'Trin 2',
    name: 'Trin 2',
  },
];

const generateTitle = pageTitle => {
  if (pageTitle === 'trainer') {
    return 'All Trainer';
  }
  return 'All Manager';
};
const generatePageToNavigate = pageTitle => {
  if (pageTitle === 'trainer') {
    return 'Feedback Trainer';
  }
  return 'Feedback Manager';
};
