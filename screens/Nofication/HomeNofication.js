import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import NotificationItem from '../../Components/NotificationItem';
import apiClient from '../../api/apiClient';
import CustomFlatlist from '../../Components/CustomFlatlist';

const HomeNofication = ({ navigation }) => {
  const callApi = useCallback(async (data) => {
    try {
      const response = await apiClient.post(`/notifications`, {
        id: '5ee55dca-0eda-406d-8b3a-c58056ad2f9b',
        pageSize: data.skip,
      });
      const result = await response?.data;
      if (!result.length) return [];
      return result;
    } catch (error) {
      console.log( 'errrorCallAPi',error);
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View className=" pt-10 pb-4 px-2 flex flex-row items-center">
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-2xl flex-1 text-center font-medium  text-black">
            Thông báo
          </Text>
        </View>
      </View>
      <View className="px-4 h-full">
        <CustomFlatlist
          limit={5}
          callApi={callApi}
          showsVerticalScrollIndicator={true}
          dependency={[]}
          hiddenOutOfList={true}
          RenderEmptyList={() => {
            return (
              <View className="">
                <View style={styles.iconContainer}>
                  <Image
                    source={{ uri: 'https://path_to_your_image/icon.png' }} // Thay bằng URL của ảnh icon
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.noNotificationText}>
                  Chưa có thông báo nào{' '}
                </Text>
                <Text style={styles.subText}>
                  Thông báo của bạn sẽ xuất hiện ở đây sau khi bạn nhận được
                  chúng.
                </Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            return <NotificationItem item={item}  />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customizeButton: {
    position: 'absolute',
    top: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 25,
  },
  customizeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    marginTop: 100,
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  noNotificationText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default HomeNofication;
