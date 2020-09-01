import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { PAGE_SIZE } from '../common/constants';
import { CommonAvatar } from '../components/common-avatar';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonSearchBar } from '../components/common-search-bar';
import { CommonTextItem } from '../components/common-text-item';
import { CommonView } from '../components/common-view';
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
                avatar {
                  url
                }
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
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [skip, sort, search]);

  return (
    <CommonView>
      <CommonTextItem
        content={header}
        haveTick={false}
        labelStyle={textStyle.bodyTextBold}
      />
      <CommonInputForm onChangeText={() => {}} placeholder="Search trainer" />

      <CommonScrollViewAwareScreenHeight onRefresh={fetchUsersData}>
        {staffs.map(staff =>
          staff.avatar.url ? (
            <TouchableOpacity
              key={staff._id}
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
                    uri={staff.avatar.url}
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
              key={staff._id}
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
    </CommonView>
  );
};

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
