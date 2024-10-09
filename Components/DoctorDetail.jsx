import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const DoctorDetail = ({item}) => {
  const navigation = useNavigation()
  return (
    <View className="mb-7">
      <View className="flex-row gap-2 items-start ">
        <Image
          style={{ width: 50, height: '100%' }}
          resizeMode="cover"
          className="rounded-full aspect-square"
          source={{
            uri: `${item.user.profilePicture}`,
          }}
        />
        <View>
          <Text className="font-semibold text-lg">
            {item?.user.fullName}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">{item?.hospital.name}</Text>
          <Text className="text-sm text-blue-300">{item.specialty}</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3 mt-1 mb-2  justify-center">
        <Text className="w-[48%] bg-slate-300 rounded-lg  py-1 text-center">
          361 lượt đặt khám
        </Text>
        <Text className="w-[48%]  bg-slate-300 py-1 rounded-lg text-center">
          <AntDesign name="star" size={12} color="orange" />
          {item.rating}
        </Text>
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <TouchableOpacity
          style={StyleSheet.buttonBottom}
          className="px-2 w-[48%] py-2 border rounded-lg border-gray-200"
        >
          <Text className="text-center">Xem hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.buttonBottom}
          onPress={() => {
            navigation.navigate('doctorappointment', {
              doctorId: item.id
            })
          }}
          className="px-2 w-[48%] py-2 border border-green-400 rounded-lg bg-green-400"
        >
          <Text className="text-center text-white">Đăt lịch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorDetail;
