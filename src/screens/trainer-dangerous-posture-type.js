import { useApolloClient } from '@apollo/react-hooks';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

import { CommonAvatar } from '../components/common-avatar';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonImageSelector } from '../components/common-image-selector';
import { CommonInputForm } from '../components/common-input-form';
import { CommonModal } from '../components/common-modal';
import { CommonPopUp } from '../components/common-popup';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTextItem } from '../components/common-text-item';
import { CommonView } from '../components/common-view';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const TrainerDangerousPostureType = ({ navigation }) => {
  const client = useApolloClient();
  const [dangerousPostureTypes, setDangerousPostureTypes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isDelete, setIsdelete] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const [avartar, setAvartar] = useState(null);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [updatePopUpVisible, setUpdatePopUpVisible] = useState(false);
  const [deletePopUpVisible, setDeletePopUpVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [_id, setID] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const deleteDangerousPostureType = _id => {
    if (
      dangerousPostureTypes.some(
        type => type._id === _id && type.dangerousPostures.total === 0
      )
    ) {
      setDeleteId(_id);
      setConfirmDeleteVisible(true);
    } else {
      Alert.alert('This type have child you need to delete all child first');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsdelete(!isDelete);
          }}
          style={{ marginRight: DIMENSIONS.DISTANCE_2 }}
        >
          <AntDesign
            color="white"
            name="edit"
            size={24}
            style={{
              alignContent: 'flex-start',
              display: 'flex',
            }}
            type="font-awesome"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDelete]);

  const validateAndExecutePostureType = () => {
    if (!title || !description || title.length < 2) {
      setErrorVisible(true);
      return;
    }
    if (_id) {
      updateDangerousPostureType();
    } else {
      createDangerousPostureType();
    }
  };
  const createDangerousPostureType = async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation CreateDangerousPostureType(
            $data: CreateDangerousPostureTypeInput!
          ) {
            createDangerousPostureType(data: $data) {
              _id
            }
          }
        `,
        variables: {
          data: {
            description,
            title,
          },
        },
      });
      setTitle(null);
      setDescription(null);

      setPopUpVisible(true);
      fetchDangerousPostureTypes();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };

  const deleteDangerousPostureTypeById = async _id => {
    try {
      await client.mutate({
        mutation: gql`
          mutation DeleteDangerousPostureType($_id: ID!) {
            deleteDangerousPostureType(_id: $_id) {
              _id
            }
          }
        `,
        variables: {
          _id,
        },
      });
      setDeleteId(null);
      setConfirmDeleteVisible(false);
      setDeletePopUpVisible(true);
      fetchDangerousPostureTypes();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };

  const updateDangerousPostureType = async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation UpdateDangerousPostureType(
            $_id: ID!
            $data: UpdateDangerousPostureTypeInput!
          ) {
            updateDangerousPostureType(_id: $_id, data: $data) {
              _id
            }
          }
        `,
        variables: {
          _id,
          data: {
            description,
            title,
          },
        },
      });
      setDescription(null);
      setTitle(null);
      setID(null);
      setUpdatePopUpVisible(true);
      fetchDangerousPostureTypes();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };

  const fetchDangerousPostureTypes = async () => {
    try {
      setRefreshing(true);
      const result = await client.query({
        query: gql`
          query($query: DangerousPostureTypesQueryInput) {
            dangerousPostureTypes(query: $query) {
              total
              data {
                _id
                title
                description
                dangerousPostures {
                  total
                }
              }
            }
          }
        `,
        variables: {
          query: { limit: 10 },
        },
      });
      const fetchDangerousPostureTypes =
        result?.data?.dangerousPostureTypes?.data ?? [];
      setDangerousPostureTypes(fetchDangerousPostureTypes);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchDangerousPostureTypes();
  }, []);
  return (
    <CommonView>
      <CommonModal visible={addModalVisible}>
        <CommonPopUp
          description="Create Dangerous Posture Type Successfully"
          modalVisible={popUpVisible}
          onClose={() => {
            setPopUpVisible(false);
          }}
          onConfirm={() => {
            setPopUpVisible(false);
            setAddModalVisible(!addModalVisible);
          }}
          popupType="success"
          title="Create Successful"
        />
        <CommonPopUp
          description="Update Dangerous Posture Type Successfully"
          modalVisible={updatePopUpVisible}
          onClose={() => {
            setPopUpVisible(false);
            setID(null);
          }}
          onConfirm={() => {
            setUpdatePopUpVisible(false);
            setAddModalVisible(!addModalVisible);
          }}
          popupType="success"
          title="Update Successful"
        />
        <CommonPopUp
          description="Name and description was required, Name's length must be larger than 2."
          modalVisible={errorVisible}
          onClose={() => setErrorVisible(false)}
          onConfirm={() => setErrorVisible(false)}
          popupType="error"
          title="Not Successful"
        />
        <CommonDismissKeyboardWrapper>
          <View style={styles.centeredView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={styles.container}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  {!_id ? (
                    <CommonTextItem
                      content=" Create Dangerous Posture Type"
                      haveTick={false}
                      labelStyle={textStyle.bodyTextBold}
                    />
                  ) : (
                    <CommonTextItem
                      content=" Update Dangerous Posture Type"
                      haveTick={false}
                      labelStyle={textStyle.bodyTextBold}
                    />
                  )}

                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.white,
                      borderRadius: 50,
                      borderWidth: 3,
                      color: COLORS.white,
                      height: 32,
                      justifyContent: 'center',
                      marginRight: 12,
                      marginTop: 10,
                      width: 32,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setAddModalVisible(!addModalVisible);
                        setID(null);
                        setAvartar(null);
                        setDescription(null);
                        setTitle(null);
                      }}
                      style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        height: 32,
                        justifyContent: 'center',
                        width: 32,
                      }}
                    >
                      <FontAwesome
                        name="close"
                        style={{
                          color: 'white',
                          fontSize: 12,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.avatarContainer}>
                    <CommonImageSelector
                      data={{
                        uri:
                          'https://www.mensjournal.com/wp-content/uploads/bench-press0-e87a4c00-4ed3-4a3a-bf75-ed8e3c87f7fe.jpg?quality=86&strip=all',
                      }}
                    />
                  </View>

                  <CommonInputForm
                    label="Name"
                    onChangeText={text => setTitle(text)}
                    placeholder="Enter name"
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'white',
                      flex: 1,
                    }}
                    value={title}
                  />

                  <CommonInputForm
                    label="Description"
                    onChangeText={text => setDescription(text)}
                    placeholder="Enter description"
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'white',
                      flex: 1,
                    }}
                    value={description}
                  />
                </View>
                <TouchableOpacity onPress={validateAndExecutePostureType}>
                  <CommonButton
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 24,
                      width: scaleH(270),
                    }}
                    title="SUBMIT"
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </CommonDismissKeyboardWrapper>
      </CommonModal>

      <View style={styles.container}>
        <CommonTextItem
          content="Type"
          haveTick={false}
          labelStyle={textStyle.bodyBigTextBold}
        />
        <TouchableOpacity
          onPress={() => {
            setAddModalVisible(!addModalVisible);
          }}
        >
          <Ionicons
            color="black"
            name="ios-add"
            size={32}
            style={styles.rightIcon}
            type="font-awesome"
          />
        </TouchableOpacity>
      </View>
      <CommonScrollViewAwareScreenHeight
        refreshControl={
          <RefreshControl
            onRefresh={fetchDangerousPostureTypes}
            refreshing={refreshing}
          />
        }
      >
        <CommonDismissKeyboardWrapper>
          <View>
            <View>
              <CommonPopUp
                cancelLabel="Cancel"
                confirmLabel="OK"
                modalVisible={confirmDeleteVisible}
                onClose={() => {
                  setConfirmDeleteVisible(false);
                  setDeleteId(null);
                }}
                onConfirm={() => deleteDangerousPostureTypeById(deleteId)}
                onDecline={() => {
                  setConfirmDeleteVisible(false);
                  setDeleteId(null);
                }}
                popupType="confirm"
                title="Are you sure to delete the dangerous posture type?"
              />
            </View>
            {dangerousPostureTypes.length > 0 && refreshing === false ? (
              dangerousPostureTypes.map((typeDangerous, i) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!isDelete) {
                      navigation.navigate('Dangerous Posture', {
                        dangerousPostureTypeId: typeDangerous._id,
                      });
                    } else {
                      setID(typeDangerous._id);
                      setDescription(typeDangerous.description);
                      setTitle(typeDangerous.title);
                      setAddModalVisible(!addModalVisible);
                    }
                  }}
                >
                  <View>
                    <ListItem
                      bottomDivider
                      key={i}
                      leftAvatar={
                        <CommonAvatar
                          editable={false}
                          key={i}
                          size="medium"
                          style={{ borderRadius: 2 }}
                          uri="https://www.mensjournal.com/wp-content/uploads/bench-press0-e87a4c00-4ed3-4a3a-bf75-ed8e3c87f7fe.jpg?quality=86&strip=all"
                        />
                      }
                      leftIcon={
                        isDelete && (
                          <View
                            style={{
                              alignContent: 'flex-start',
                              display: 'flex',
                            }}
                            visible={false}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                deleteDangerousPostureType(typeDangerous._id)
                              }
                            >
                              <FontAwesome
                                color="red"
                                name="minus-circle"
                                size={24}
                                style={{
                                  alignContent: 'flex-start',
                                  display: 'flex',
                                }}
                                type="font-awesome"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      }
                      rightIcon={
                        <View
                          style={{
                            alignContent: 'flex-start',
                            display: 'flex',
                            width: '15%',
                          }}
                        >
                          <Ionicons
                            color="black"
                            key={i}
                            name="ios-arrow-forward"
                            size={32}
                            style={{
                              alignContent: 'flex-start',
                              display: 'flex',
                              width: '100%',
                            }}
                            type="font-awesome"
                          />
                        </View>
                      }
                      style={{
                        width: DIMENSIONS.SCREEN_WIDTH,
                      }}
                      subtitle={typeDangerous.description}
                      title={typeDangerous.title}
                      titleStyle={{ fontWeight: 'bold' }}
                    />
                  </View>
                </TouchableOpacity>
              ))
            ) : refreshing === false ? (
              <View
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <CommonTextItem
                  content="NO DATA"
                  haveTick={false}
                  labelStyle={textStyle.bodyTextBold}
                />
              </View>
            ) : null}

            <CommonPopUp
              description="Delete Dangerous Posture Type Successfully"
              modalVisible={deletePopUpVisible}
              onClose={() => {
                setDeletePopUpVisible(false);
              }}
              onConfirm={() => {
                setDeletePopUpVisible(false);
              }}
              popupType="success"
              title="Delete Successful"
            />
          </View>
        </CommonDismissKeyboardWrapper>
      </CommonScrollViewAwareScreenHeight>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    padding: DIMENSIONS.PADDING,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding: DIMENSIONS.PADDING,
  },
  container: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBody: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: DIMENSIONS.MARGIN_COMPONENT,
    padding: DIMENSIONS.PADDING_CONTENT,
    width: '100%',
  },
  modalHeader: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    paddingBottom: DIMENSIONS.PADDING,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
  },
  rightIcon: {
    width: 32,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
