import { useApolloClient } from '@apollo/react-hooks';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';

import { CommonAvatar } from '../components/common-avatar';
import { CommonButton } from '../components/common-button';
import { CommonDismissKeyboardWrapper } from '../components/common-dismiss-keyboard-wrapper';
import { CommonInputForm } from '../components/common-input-form';
import { CommonModal } from '../components/common-modal';
import { CommonPopUp } from '../components/common-popup';
import { CommonScrollViewAwareScreenHeight } from '../components/common-scroll-view-aware-screen-height';
import { CommonTextItem } from '../components/common-text-item';
import { CommonView } from '../components/common-view';
import { COLORS } from '../constants/colors';
import { DIMENSIONS, scaleH } from '../constants/dimensions';
import { textStyle } from '../constants/text-styles';

export const TrainerDangerousPosture = ({ navigation, route }) => {
  const client = useApolloClient();
  const { dangerousPostureTypeId } = route.params;
  const [dangerousPostures, setDangerousPostures] = useState([]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [updatePopUpVisible, setUpdatePopUpVisible] = useState(false);
  const [deletePopUpVisible, setDeletePopUpVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isDelete, setIsdelete] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [_id, setID] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
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

  const validateAndExecutePosture = () => {
    if (!title || !description || title.length < 2) {
      setErrorVisible(true);
      return;
    }
    if (_id) {
      updateDangerousPosture();
    } else {
      createDangerousPosture();
    }
  };

  const deleteDangerousPosture = async _id => {
    try {
      await client.mutate({
        mutation: gql`
          mutation DeleteDangerousPosture($_id: ID!) {
            deleteDangerousPosture(_id: $_id) {
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
      fetchDangerousPostures();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };

  const fetchDangerousPostures = async () => {
    try {
      setRefreshing(true);
      const result = await client.query({
        query: gql`
          query($query: DangerousPosturesQueryInput) {
            dangerousPostures(query: $query) {
              data {
                _id
                title
                description
                createdAt
                updatedAt
              }
            }
          }
        `,
        variables: {
          query: {
            filter: {
              dangerousPostureType: [dangerousPostureTypeId.toString()],
            },
            limit: 10,
          },
        },
      });
      const fetchDangerousPostures =
        result?.data?.dangerousPostures?.data ?? [];
      setDangerousPostures(fetchDangerousPostures);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchDangerousPostures();
  }, []);
  const createDangerousPosture = async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation CreateDangerousPosture($data: CreateDangerousPostureInput!) {
            createDangerousPosture(data: $data) {
              _id
            }
          }
        `,
        variables: {
          data: {
            dangerousPostureTypeId,
            description,
            title,
          },
        },
      });
      setTitle(null);
      setDescription(null);

      setPopUpVisible(true);
      fetchDangerousPostures();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };
  const updateDangerousPosture = async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation UpdateDangerousPosture(
            $_id: ID!
            $data: UpdateDangerousPostureInput!
          ) {
            updateDangerousPosture(_id: $_id, data: $data) {
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
      fetchDangerousPostures();
    } catch (e) {
      if (e.message.includes('title_1 dup key')) {
        Alert.alert('Name was existed');
      } else {
        Alert.alert(`${e.message.split(': ')[1]}!`);
      }
    }
  };

  return (
    <CommonView>
      <CommonModal visible={addModalVisible}>
        <CommonPopUp
          description="Create Dangerous Posture Successfully"
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
          description="Update Dangerous Posture Successfully"
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
                      content=" Create Dangerous Posture"
                      haveTick={false}
                      labelStyle={textStyle.bodyTextBold}
                    />
                  ) : (
                    <CommonTextItem
                      content=" Update Dangerous Posture"
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
                <TouchableOpacity onPress={validateAndExecutePosture}>
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
            onRefresh={fetchDangerousPostures}
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
                onConfirm={() => deleteDangerousPosture(deleteId)}
                onDecline={() => {
                  setConfirmDeleteVisible(false);
                  setDeleteId(null);
                }}
                popupType="confirm"
                title="Are you sure to delete the dangerous posture?"
              />
            </View>
            {dangerousPostures.length > 0 && refreshing === false ? (
              dangerousPostures.map((dangerousPosture, i) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!isDelete) {
                      navigation.navigate('Dangerous Posture Detail', {
                        dangerousPosture,
                      });
                    } else {
                      setID(dangerousPosture._id);
                      setDescription(dangerousPosture.description);
                      setTitle(dangerousPosture.title);
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
                              onPress={() => {
                                setDeleteId(dangerousPosture._id);
                                setConfirmDeleteVisible(true);
                              }}
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
                      style={{
                        width: DIMENSIONS.SCREEN_WIDTH,
                      }}
                      subtitle={dangerousPosture.description}
                      title={dangerousPosture.title}
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
