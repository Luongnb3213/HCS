import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import apiClient from "../../api/apiClient";
import { SafeAreaView } from "react-native-safe-area-context";

const HealthProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const userId = 1; // Placeholder

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
        {/* Custom Header */}
        <View className="bg-green-500 flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Hồ Sơ Sức Khỏe</Text>
          <TouchableOpacity className="p-2" onPress={() => alert("Upload")}>
            <Text className="text-white text-sm">Tải lên</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="flex-row items-center p-4 bg-white">
          {user && (
            <>
              <Image
                source={{ uri: user.profilePicture }}
                className="w-16 h-16 rounded-full"
              />
              <View className="ml-4">
                <Text className="text-base font-bold">{user.fullName}</Text>
                <Text className="text-sm text-gray-600">
                  0 Lần khám | 0 Thành viên | BMI --
                </Text>
              </View>
              <Button title="Refresh" onPress={() => {}} />
            </>
          )}
        </View>

        {/* Family & Friends Health Profile */}
        {/* <View className="p-4">
          <Text className="text-base font-bold mb-2">
            Hồ sơ sức khỏe người thân, bạn bè
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center w-1/2">
              <Text className="text-sm text-center">Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center w-1/2">
              <Text className="text-sm text-center">Thêm thành viên</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* No Health Record Section */}
        <View className="items-center py-6">
          <Image
            source={{
              uri: "https://www.shutterstock.com/shutterstock/photos/1379987435/display_1500/stock-vector-data-not-found-icon-1379987435.jpg",
            }}
            className="w-32 h-32 rounded-full"
          />
          <Text className="text-base text-gray-500">
            Không có hồ sơ sức khỏe
          </Text>
        </View>

        <View className="px-4 py-2">
          {user && (
            <>
              <Text className="font-bold text-lg">Tháng 09/2024</Text>
              <TouchableOpacity
                className="rounded-lg shadow bg-white p-4 mt-2 mb-2 flex-row"
                onPress={() => navigation.navigate("HealthReport")}
              >
                <Image
                  source={{ uri: user.profilePicture }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4 justify-between">
                  <Text className="font-bold text-lg">
                    Ngày khám: 10/09/2024
                  </Text>
                  <Text className="italic text-lg text-blue-500">
                    Mã HS: 2409102677
                  </Text>
                </View>
              </TouchableOpacity>

              <Text className="font-bold text-lg">Tháng 06/2024</Text>
              <TouchableOpacity
                className="rounded-lg shadow bg-white p-4 mt-2 mb-2 flex-row"
                onPress={() => navigation.navigate("HealthReport")}
              >
                <Image
                  source={{ uri: user.profilePicture }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4 justify-between">
                  <Text className="font-bold text-lg">
                    Ngày khám: 04/06/2024
                  </Text>
                  <Text className="italic text-lg text-blue-500">
                    Mã HS: 2406041525
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Options */}
        <View className="p-4">
          <TouchableOpacity className="bg-green-500 p-4 rounded-full mb-2 items-center">
            <Text className="text-white text-base">Xem kết quả khám</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 p-4 rounded-full items-center">
            <Text className="text-white text-base">Tải lên hồ sơ sức khỏe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthProfile;
