import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Components/CustomHeader';
import apiClient from '../../api/apiClient';

const BookingScreen = ({ navigation, route }) => {
  
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('')
  const parseDate = (dateString) => {
    const currentYear = new Date().getFullYear();

    const [day, month] = dateString.split('-');
    const formattedDate = `${currentYear}-${month}-${day}`;
    return formattedDate;
  };

  const { doctor, date, time } = route.params;


  const bookAppointment = async () => {
    setLoading(true); 

    const appointmentData = {
      userId: '5ee55dca-0eda-406d-8b3a-c58056ad2f9b', 
      doctorId: doctor.id,
      hospitalId: doctor.hospital.id,
      appointmentDate: new Date(`${parseDate(date)}T${time}:00`), 
      status: 'PENDING',
      reason: note,
    };

    try {
      const response = await apiClient.post('/appointment', appointmentData);
      console.log(response.status)
      if (response.status === 201) {
        Alert.alert('Thành công', 'Đặt lịch khám thành công');
        setTimeout(() =>{
            navigation.navigate('medicalSchedule'); 
        }, 500)
       
      } else {
        Alert.alert('Lỗi', 'Không thể đặt lịch khám, vui lòng thử lại');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đặt lịch');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-gray-100">

        <CustomHeader
          title="Đặt lịch khám"
          navigate={() => {
            navigation.goBack();
          }}
        />

 
        <View className="bg-white p-4 m-4 rounded-lg shadow">
          <Text className="text-gray-500">Thông tin đặt hẹn</Text>

          <View className="mt-4">
            <Text className="text-gray-700">Cơ sở y tế</Text>
            <Text className="font-bold">{doctor.hospital.name}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-gray-700">Chuyên khoa khám</Text>
            <Text className="font-bold">{doctor.specialty}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-gray-700">Bác sĩ dịch vụ</Text>
            <Text className="font-bold">{doctor.user.fullName}</Text>
            <Text className="text-gray-500">Giá: {doctor.rent} đ</Text>
          </View>

      
          <View className="mt-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-gray-700">Giờ khám:</Text>
              <Text className="ml-2 font-bold">{time}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-700">Ngày khám:</Text>
              <Text className="ml-2 font-bold">{parseDate(date)}</Text>
            </View>
          </View>
        </View>

   
        <View className="bg-white p-4 m-4 rounded-lg shadow">
          <Text className="text-gray-500">Chọn người đi khám</Text>
          <View className="mt-4 flex-row items-center">
            <View className="bg-blue-100 p-4 rounded-lg">
              <Text className="font-bold">P</Text>
            </View>
            <View className="ml-4">
              <Text className="font-bold">PHẠM</Text>
              <Text className="text-gray-500">Chủ tài khoản</Text>
            </View>
            <TouchableOpacity className="ml-auto bg-blue-500 px-4 py-2 rounded-lg">
              <Text className="text-white font-bold">Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

    
        <View className="bg-white p-4 m-4 rounded-lg shadow">
          <Text className="text-gray-500">Nhập yêu cầu khác</Text>
          <View className="mt-2 border border-gray-300 p-4 rounded-lg">
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Thêm ghi chú..."
              className="text-gray-700"
              multiline 
              style={{ height: 30 }} 
            />
          </View>
        </View>

        
        <TouchableOpacity
          className="bg-green-500 m-4 mb-5 p-4 rounded-lg"
          onPress={bookAppointment}
          disabled={loading} 
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> 
          ) : (
            <Text className="text-center text-white font-bold">Tiếp tục</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
