import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const data = [
  { id: '1', title: 'Chờ duyệt' },
  { id: '2', title: 'Đã duyệt' },
  { id: '3', title: 'Đang khám' },
  { id: '4', title: 'Hoàn thành ' },
  { id: '5', title: 'Quá hẹn' },
  { id: '6', title: 'Đã huỷ' },
];

const MedicalSchedule = ({ navigation }) => {
  const [status, setStatus] = useState('Chờ duyệt');

  const handlePress = (item) => {
    setStatus(item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-green-500 pt-10 pb-4 px-2 flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-2xl flex-1 text-center font-medium  text-white">
          Lịch Khám{' '}
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              className={`px-2 py-2 ${
                status == item.title ? 'border-b-2 border-b-green-500' : ''
              } `}
              onPress={() => handlePress(item)}
            >
              <Text
                className={`text-xs ${
                  status == item.title ? 'text-green-500' : ''
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

      <View className="flex-1 flex items-center justify-between">
            <Text className="mt-20   flex items-center justify-between">Không có dữ liệu</Text>  
      </View>
    </SafeAreaView>
  );
};

export default MedicalSchedule;
