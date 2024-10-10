import React, { useState, useEffect } from 'react';
import CustomHeader from '../../Components/CustomHeader';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../Components/Calendar';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TimeSlotComponent from '../../Components/TimeSlotComponent ';
import useFetch from '../../hook/useFetch';

const DoctorAppointment = ({ navigation, route }) => {
  const { doctorId } = route.params;
  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  });
  const [time, settime] = useState('');
  const dataa = [1];

  const { data, loading, error } = useFetch(
    `/doctors/getDoctorByID?id=${doctorId}`,
    {
      method: 'GET',
    }
  );

  const renderItem = () => (
    <View className="rounded-lg mx-4 mt-4 bg-gray-300">
      <View className="p-3">
        <View className="flex-row mb-3 items-start justify-start gap-2">
          <Feather name="map-pin" size={24} color="black" />
          <View>
            <Text className="font-medium leading-none mb-1 text-[#222] text-base">
              Tư vấn {data.specialty}
            </Text>
            <Text className="text-[#555] text-xs">
              Tư vấn trực tuyến - {data.specialty}
            </Text>
          </View>
        </View>
        <View className="flex-row items-start justify-start gap-2">
          <MaterialIcons name="health-and-safety" size={24} color="black" />
          <View style={{ flexShrink: 1 }}>
            <Text className="font-medium flex-wrap leading-none mb-1 text-[#222] text-base">
              Tư vấn {data.specialty} chuyên sâu với Bác sĩ {data.user.fullName}
            </Text>
            <Text className="text-red-500 text-sm">{data.rent} đ</Text>
          </View>
        </View>

        <View>
          <TimeSlotComponent time={time} setTime={settime} />
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        title="Chọn thời gian khám"
        navigate={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={dataa}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View className="px-4 pb-3 bg-white">
            <View className="mt-4">
              <Text className="text-base text-center uppercase text-[#222222] font-medium mb-3">
                {data.user.fullName}
              </Text>
              <Text className="text-sm text-center text-[#555555]">
                Lịch tư vấn trực tuyến
              </Text>
            </View>
            <View className="mt-3">
              <Calendar
                date={date}
                setDate={setDate}
                numberDays={7}
                startFromMonday={false}
              />
            </View>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('bookingscreen', {
            doctor: data,
            date: date,
            time: time,
          });
        }}
        disabled={!(date && time)}
        className= {` w-56 mt-3 rounded-lg mb-3 mx-auto bg-green-400 ${!(date && time) && 'opacity-60'}`}
      >
        <Text className="text-center text-sm font-normal uppercase text-white px-3 py-2">
          Xác Nhận
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorAppointment;
