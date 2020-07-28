// import { useState } from 'react';
// import {
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// const ChangePasswordModal = ({ visibleState }) => {
//   const [visible, setVisible] = useState(visibleState);
//   return (
//     <Modal animationType="slide" transparent visible={visible}>
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Hello World!</Text>
//           <TouchableHighlight
//             onPress={() => {
//               setVisible(!visible);
//             }}
//             style={{ ...styles.openButton, backgroundColor: 'red' }}
//           >
//             <Text style={styles.textStyle}>Hide Modal</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     marginTop: 22,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   modalView: {
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     elevation: 5,
//     margin: 20,
//     padding: 35,
//     shadowColor: '#000',
//     shadowOffset: {
//       height: 2,
//       width: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     elevation: 2,
//     padding: 10,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
