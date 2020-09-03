import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { CommonButton } from '../components/common-button';
import { CommonIcon } from '../components/common-icon';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonView } from '../components/common-view';

export const WarningUpdatePostureScreen = ({ navigation, route }) => {
  const client = useApolloClient();
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState('');
  const [dangerousPostureTypes, setDangerousPostureTypes] = useState([]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const result = await client.query({
        query: gql`
          query {
            dangerousPostureTypes {
              total
              data {
                title
                dangerousPostures {
                  total
                  data {
                    _id
                    title
                  }
                }
              }
            }
          }
        `,
      });
      const fetchedDangerousPostureTypes =
        result?.data?.dangerousPostureTypes?.data ?? [];
      setDangerousPostureTypes(
        fetchedDangerousPostureTypes.map((d, i) => ({
          isDropDown: false,
          key: d._id,
          no: i,
          ...d,
        }))
      );
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
  };

  const updateWarning = async () => {
    setRefreshing(true);
    try {
      await client.query({
        query: gql`
          mutation($warningId: ID!, $dangerousPostureId: ID) {
            updateWarning(
              _id: $warningId
              data: { dangerousPostureId: $dangerousPostureId }
            ) {
              _id
              dangerousPosture {
                title
                description
                dangerousPostureType {
                  title
                  description
                }
              }
              content
              status
            }
          }
        `,
        variables: {
          dangerousPostureId: selected,
          warningId: route.params.warningId,
        },
      });
      Alert.alert('Update warning succeeded!');
    } catch (e) {
      Alert.alert(`${e.message.split(': ')[1]}!`);
    }
    setRefreshing(false);
    navigation.navigate('Warning Detail');
  };

  const onRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommonScrollViewAwareScreenHeight
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <CommonView>
        {dangerousPostureTypes.map(dangerousPostureType => (
          <TouchableOpacity
            onPress={() => {
              setDangerousPostureTypes(
                dangerousPostureTypes.map(d => {
                  if (d._id === dangerousPostureType._id) {
                    dangerousPostureType.isDropDown = !dangerousPostureType.isDropDown;
                  }
                  return d;
                })
              );
            }}
          >
            <ListItem
              bottomDivider
              rightIcon={
                <CommonIcon
                  color="black"
                  name={
                    dangerousPostureType.isDropDown
                      ? 'angle-down'
                      : 'angle-right'
                  }
                  size={22}
                />
              }
              showSeparator="true"
              title={dangerousPostureType.title}
              type="detail"
            />
            <View style={{ marginLeft: 20 }}>
              {dangerousPostureType.isDropDown &&
                dangerousPostureType.dangerousPostures.data.map(
                  dangerousPosture => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(dangerousPosture._id);
                      }}
                    >
                      <View>
                        <ListItem
                          rightIcon={
                            <CommonIcon
                              color="green"
                              name={
                                dangerousPosture._id === selected && 'check'
                              }
                              size={22}
                            />
                          }
                          showSeparator="true"
                          title={dangerousPosture.title}
                          type="detail"
                        />
                      </View>
                    </TouchableOpacity>
                  )
                )}
            </View>
          </TouchableOpacity>
        ))}
        <View>
          <CommonButton onPress={() => updateWarning()} title="Update" />
        </View>
      </CommonView>
    </CommonScrollViewAwareScreenHeight>
  );
};
