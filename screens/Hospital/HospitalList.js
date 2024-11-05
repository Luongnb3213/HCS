import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions 
} from 'react-native';
import apiClient from '../../api/apiClient'; // Import apiClient đã được cấu hình
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import CustomFlatlist from '../../Components/CustomFlatlist';
import HospitalMap from './HospitalMap';
const HospitalList = () => {
  const screenWidth = Dimensions.get('window').width; 
const calculatedWidth = screenWidth - 50 - 12 - 60 - 32;
  const [search, setSearch] = React.useState('');
  const navigation = useNavigation();

  const callApi = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post(`hospitals/filter`, {
          pageSize: data.skip,
          limit: data.limit,
        });
        const result = await response.data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    [search]
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('HospitalDetail', { hospital: item.id })} // Điều hướng đến trang chi tiết bệnh viện
    >
      <View style={styles.itemContent}>
        <Image
          source={{ uri: item.picture || 'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2F101123773.jpg?alt=media&token=284dc068-2734-4761-a372-100487048b2c' }} // Placeholder khi không có hình ảnh
          style={styles.itemImage}
        />
        <View style={{ width: calculatedWidth}} className="flex w-full">
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemName}>
            {item.name}
          </Text>
          <HospitalMap hospitalName={item.name} />
          <Text style={styles.itemAddress}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-2 pt-4  gap-3 flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-1 flex-row items-center rounded-md px-3 py-1 justify-center bg-gray-200">
          <Fontisto name="search" size={15} color="black" />
          <TextInput
            onChangeText={setSearch}
            value={search}
            className="ml-3"
            placeholder="Tìm kiếm bệnh viện/phòng khám"
          />
        </View>
      </View>
      <CustomFlatlist
        limit={5}
        callApi={callApi}
        showsVerticalScrollIndicator={true}
        dependency={[search]}
        hiddenOutOfList={true}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 14,
    color: '#666',
  },
  itemText: {
    flexGrow: 1
  },
});

export default HospitalList;
