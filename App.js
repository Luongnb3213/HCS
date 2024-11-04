import { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Không cần dùng {} cho jwtDecode
import AuthContext from './constants/AuthContext';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null); // Khởi tạo với null
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken && storedToken !== 'notoken') {
          setToken(storedToken);
          const decoded = jwtDecode(storedToken);
          setUser(decoded);
        } else {
          setToken('notoken');
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };
    getToken();
  }, []);

  console.log(token); // Token sẽ được log đúng sau khi được lấy từ AsyncStorage

  return (
    <AuthContext.Provider value={{ user, setUser, setToken }}>
      <AppNavigator />
      {token === 'notoken' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

// import React from "react";
// import { View, Button, Alert } from "react-native";
// import * as XLSX from "xlsx";
// import * as DocumentPicker from "expo-document-picker";
// import axios from "axios";
// import apiClient from "./api/apiClient";

// const App = () => {
//   const saveDataToDatabase = async (data) => {
//     try {
//       const response = await apiClient.post(`/hospitals/`, data);
//       if (response.status === 200) {
//         Alert.alert("Thành công", "Dữ liệu đã được lưu vào database.");
//       } else {
//         Alert.alert("Lỗi", "Không thể lưu dữ liệu vào database.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu dữ liệu vào database.");
//     }
//   };

//   const readExcel = async (fileUri) => {
//     const response = await fetch(fileUri);
//     const blob = await response.blob();

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const arrayBuffer = e.target.result;
//       const workbook = XLSX.read(arrayBuffer, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);

//       const convertKeysToLowerCase = (data) => {
//         return data.map((item) => {
//           return Object.entries(item).reduce((acc, [key, value]) => {
//             acc[key.toLowerCase()] = value;
//             return acc;
//           }, {});
//         });
//       };

//       const transformedData = convertKeysToLowerCase(jsonData);

//       if (transformedData.length > 0) {
//         // Gọi API để lưu dữ liệu vào database
//         console.log(transformedData);
//         saveDataToDatabase(transformedData);
//       } else {
//         Alert.alert("Thông báo", "Không có dữ liệu trong file Excel.");
//       }
//     };
//     reader.readAsArrayBuffer(blob);
//   };

//   const handleUpload = async () => {
//     try {
//       const res = await DocumentPicker.getDocumentAsync({
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       if (!res.canceled) {
//         const fileUri = res.assets[0].uri;
//         await readExcel(fileUri);
//       } else {
//         Alert.alert("Thông báo", "Bạn đã hủy việc chọn file.");
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Lỗi", "Đã xảy ra lỗi khi chọn file.");
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Button title="Tải File" onPress={handleUpload} />
//     </View>
//   );
// };

// export default App;
