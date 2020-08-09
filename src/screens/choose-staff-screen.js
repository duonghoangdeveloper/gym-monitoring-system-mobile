import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { PAGE_SIZE } from '../common/constants';
import { CommonAvatar } from '../components/common-avatar';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTextItem } from '../components/common-text-item';
import { DIMENSIONS } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const ChooseStaffScreen = ({ navigation, route }) => {
  const pageTitle = route.params.name;
  const pageRole = generatePageRole(pageTitle);

  const [staffs, setStaffs] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState(INIT_SEARCH);
  const [searchAll, setSearchAll] = useState('');

  const pageToNavigate = generatePageToNavigate(pageTitle);
  const header = generateTitle(pageTitle);
  const client = useApolloClient();

  const fetchUsersData = async () => {
    try {
      const result = await client.query({
        query: gql`
          query getUser($query: UsersQueryInput!) {
            users(query: $query) {
              data {
                _id
                displayName
                avatar
              }
              total
            }
          }
        `,
        variables: {
          query: {
            filter: { role: pageRole },
            isActive: true,
            limit: PAGE_SIZE,
            search,
            skip,
            sort,
          },
        },
      });
      const fetchedStaffsData = result?.data?.users?.data ?? [];
      const fetchedStaffsTotal = result?.data?.users?.total ?? 0;
      setStaffs(
        fetchedStaffsData.map((user, index) => ({
          key: user._id,
          no: skip + index + 1,
          ...user,
        }))
      );
      setTotal(fetchedStaffsTotal);
    } catch (e) {
      // Do something
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [skip, sort, search]);

  return (
    <View
      style={{
        flex: 1,
        width: DIMENSIONS.SCREEN_WIDTH,
      }}
    >
      <CommonTextItem
        content={header}
        haveTick={false}
        labelStyle={textStyle.bodyTextBold}
      />
      <CommonScrollViewAwareScreenHeight
        onRefresh={fetchUsersData}
        refreshable
        refreshing
      >
        {staffs.map(staff =>
          staff.avatar ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(pageToNavigate, {
                  pageTitle,
                  staff,
                })
              }
            >
              <ListItem
                bottomDivider
                key={staff._id}
                leftAvatar={
                  <CommonAvatar
                    editable={false}
                    size="small"
                    uri={staff.avatar}
                  />
                }
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH,
                }}
                title={staff.displayName}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(pageToNavigate, { pageTitle, staff })
              }
            >
              <ListItem
                bottomDivider
                key={staff._id}
                leftAvatar={
                  <CommonAvatar
                    editable={false}
                    size="small"
                    uri="https://previews.123rf.com/images/jemastock/jemastock1708/jemastock170807787/83959218-muscular-man-flexing-biceps-avatar-fitness-icon-image-vector-illustration-design.jpg"
                  />
                }
                style={{
                  width: DIMENSIONS.SCREEN_WIDTH,
                }}
                title={staff.displayName}
              />
            </TouchableOpacity>
          )
        )}
      </CommonScrollViewAwareScreenHeight>
    </View>
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

const generatePageRole = pageTitle => {
  if (pageTitle === 'trainer') {
    return 'TRAINER';
  }
  return 'MANAGER';
};

const INIT_SEARCH = {
  displayName: '',
  email: '',
  username: '',
};
