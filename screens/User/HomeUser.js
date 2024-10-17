import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import apiClient from "../../api/apiClient";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeUser = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-gray-100">
        <View className="items-center py-5 bg-gray-100">
          {user && (
            <>
              <Image
                source={{ uri: user.profilePicture }}
                className="w-24 h-24 rounded-full"
              />
              <Text className="text-xl font-bold mt-2">{user.fullName}</Text>
              <Text className="text-orange-500 my-2">0 điểm</Text>
            </>
          )}
          <TouchableOpacity
            className="bg-green-500 px-5 py-2 rounded-full"
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text className="text-white font-bold">Cập nhật</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-yellow-100 p-4 my-2">
          <Text className="font-bold text-lg">Thành viên mới</Text>
          <Text className="text-gray-500 mt-1">
            Bạn cần thêm 1 điểm tích lũy để lên hạng Hạng Thành Viên
          </Text>
        </View>

        <View className="bg-white p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-lg font-bold mb-2">Tiện ích</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                // source={require('./assets/icon_sos.png')}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Gọi bác sĩ khẩn cấp</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                // source={require('./assets/icon_doctor_chat.png')}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Hỏi riêng Bác sĩ</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                // source={require('./assets/icon_heart_rate.png')}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Theo dõi chỉ số</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2454/2454212.png"
                }}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Ưu đãi của tôi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white p-4 mt-4 rounded-lg shadow mx-4">
          <Text className="text-lg font-bold mb-2">Dịch vụ của bạn</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                // source={require('./assets/icon_calendar.png')}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Lịch khám</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
                  }}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/4 items-center"
              onPress={() => navigation.navigate("HealthProfile")}
            >
              <Image
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2221/2221950.png",
                }}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Hồ sơ sức khỏe</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/4 items-center">
              <Image
                source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/7757/7757793.png"
                }}
                className="w-12 h-12 mb-2"
              />
              <Text className="text-center text-sm">Cộng đồng</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 mt-5">
          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-lg">Thiết lập ứng dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-lg">Tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-lg">Chính sách và hỗ trợ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeUser;
