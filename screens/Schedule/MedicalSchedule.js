import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomHeader from '../../Components/CustomHeader';
import apiClient from '../../api/apiClient';
import CustomFlatlist from '../../Components/CustomFlatlist';
import Appoinment from './Appoinment';


const AppointmentStatus = [
  { id: '1', title: 'Chờ duyệt', value: 'PENDING' },
  { id: '2', title: 'Đã duyệt', value: 'CONFIRMED' },
  { id: '4', title: 'Hoàn thành ', value: 'COMPLETED' },
  { id: '5', title: 'Quá hẹn', value: 'OVERDUE' },
  { id: '6', title: 'Đã huỷ', value: 'CANCELLED' },
];

const MedicalSchedule = ({ navigation }) => {
  const [status, setStatus] = useState('PENDING');
  const handlePress = (item) => {
    setStatus(item.value);
  };

  const callApi = useCallback(
    async (data) => {
      try {
        const response = await apiClient.get(
          `/appointment?id=5ee55dca-0eda-406d-8b3a-c58056ad2f9b&status=${status}`
        );
        const result = await response.data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    [status]
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        title="Lịch Khám"
        navigate={() => {
          navigation.navigate('Home');
        }}
      />
      <View>
        <FlatList
          data={AppointmentStatus}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              className={`px-2 py-2 ${
                status == item.value ? 'border-b-2 border-b-green-500' : ''
              } `}
              onPress={() => handlePress(item)}
            >
              <Text
                className={`text-sm ${
                  status == item.value ? 'text-green-500' : ''
                }  font-medium`}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="mt-4 flex-1 flex items-center justify-between">
          <CustomFlatlist
            limit={5}
            callApi={callApi}
            showsVerticalScrollIndicator={true}
            dependency={[status]}
            hiddenOutOfList= {true}
            renderItem={({item}) => {
              return <Appoinment item={item} />
            }}
          />
        </View>
    </SafeAreaView>
  );
};

export default MedicalSchedule;
