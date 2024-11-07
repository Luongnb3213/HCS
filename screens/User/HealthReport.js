import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  tabData,
  dtData,
  kqkData,
  cdhaData,
  examTitle,
  examDate,
  examId,
  prescriptionTitle,
} from './data';
import AuthContext from '../../constants/AuthContext';
import apiClient from '../../api/apiClient';

const HealthReport = () => {
  const getUserToken = () => {
    const { user } = useContext(AuthContext);
    return user?.id;
  };
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const userId = getUserToken(); // Placeholder

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const [activeTab, setActiveTab] = useState('Kết quả khám');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView className="flex-1 bg-white">
          {/* Header */}
          <View className="bg-green-500 flex-row items-center justify-center p-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-4 p-2"
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Chi tiết kết quả khám
            </Text>
          </View>

          {/* Info */}
          <View className="px-4 py-2">
            <Text className="font-bold text-lg">Ngày khám: {examDate}</Text>
            <Text className="italic text-lg text-blue-500">
              Mã HS: {examId}
            </Text>
            {/* <TouchableOpacity className="right-4">
              <Text className="text-black rounded-lg bg-gray-100 text-base">
                Kết quả ký số
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Tabs */}
          <FlatList
            data={tabData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTabPress(item.title)}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === item.title
                    ? 'border-green-600'
                    : 'border-transparent'
                }`}
              >
                <Text
                  className={`text-lg ${
                    activeTab === item.title ? 'font-bold text-green-500' : ''
                  }`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          {/* Content based on activeTab */}
          {activeTab === 'Kết quả khám' && (
            <View>
              <Text className="text-lg font-bold mx-4 mb-3 mt-6">
                {examTitle}
              </Text>
              <View className="bg-gray-100 px-4 pt-2 rounded-lg mx-4">
                {kqkData.map((item, index) => (
                  <View className="flex-row mb-3" key={index}>
                    <Text className="text-lg w-2/3">{item.label}</Text>
                    <Text className="text-lg w-1/3 text-right">
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'Kết quả CDHA và thăm dò chức năng' && (
            <View className="bg-gray-100 px-4 py-2 rounded-lg mx-4 mt-6">
              {cdhaData.map((item, index) => (
                <View key={index} className="mb-4">
                  <TouchableOpacity className="border-b border-gray-300 pb-2 flex-row items-center justify-between">
                    <Text className="text-lg font-bold">{item.title}</Text>
                  </TouchableOpacity>
                  <View className="pt-2">
                    <Text className="text-base font-bold">KỸ THUẬT:</Text>
                    <Text className="text-base ml-4">{item.technique}</Text>
                    <Text className="text-base font-bold">MÔ TẢ:</Text>
                    {item.description.map((desc, i) => (
                      <Text key={i} className="text-base ml-4">
                        {desc}
                      </Text>
                    ))}
                    <Text className="text-base font-bold">KẾT LUẬN:</Text>
                    <Text className="text-base ml-4">{item.conclusion}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'Đơn thuốc' && (
            <View>
              <Text className="text-lg font-bold mx-4 mb-3 mt-6">
                {prescriptionTitle}
              </Text>
              <View className="bg-gray-100 px-4 pt-2 rounded-lg mx-4">
                <View className="flex-row">
                  <Text className="w-1/6 font-bold text-lg text-left">STT</Text>
                  <Text className="w-3/6 font-bold text-lg text-left">
                    Tên thuốc
                  </Text>
                  <Text className="w-2/6 font-bold text-lg text-right">
                    Số lượng
                  </Text>
                </View>
                {dtData.map((item, index) => (
                  <View
                    key={item.id}
                    className={`flex-row ${
                      index === dtData.length - 1 ? '' : 'border-b'
                    } border-gray-300 py-2`}
                  >
                    <View className="w-1/6 justify-center items-center pr-7">
                      <Text className="font-bold text-base">{item.id}</Text>
                    </View>
                    <View className="w-3/6 px-1">
                      <Text className="font-bold text-left text-lg">
                        {item.name}
                      </Text>
                      <Text className="text-left text-base">{item.dosage}</Text>
                    </View>
                    <View className="w-2/6 justify-center">
                      <Text className="text-right text-base">
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer Navigation */}
        <View className="p-4">
          <View className="flex-row items-center justify-between bg-white px-4 py-2 border-t border-gray-200">
            {/* Nút "Xem lần khám cũ hơn" */}
            <TouchableOpacity
              className="flex-row items-center"
            >
              <Ionicons name="chevron-back-outline" size={20} color="#007AFF" />
              <Text className="text-blue-500 text-sm ml-2">
                Xem lần khám cũ hơn
              </Text>
            </TouchableOpacity>

            {/* Đường phân cách */}
            <View className="w-px h-6 bg-gray-300" />

            {/* Nút "Xem lần khám mới hơn" */}
            <TouchableOpacity
              className="flex-row items-center"
            >
              <Text className="text-blue-500 text-sm mr-2">
                Xem lần khám mới hơn
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HealthReport;
