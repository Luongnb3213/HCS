import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { tabData, usersData } from "./data";
import AuthContext from "../../constants/AuthContext";

const HealthReport = () => {
  const getUserToken = () => {
    const { user } = useContext(AuthContext);
    return user?.id;
  };
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const userId = getUserToken();

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

  const [userData, setUserData] = useState(usersData[userId]);

  useEffect(() => {
    setUserData(usersData[userId]); // Cập nhật dữ liệu khi `userId` thay đổi
  }, [userId]);

  const [activeTab, setActiveTab] = useState("Kết quả khám");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView className="flex-1">
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

      <View className="bg-white">
        {/* Info */}
        <View className="px-4 py-2">
          <View>
            <Text className="font-bold text-lg">
              Ngày khám: {userData ? `${userData.examDate}` : "N/A"}
            </Text>
            <Text className="italic text-lg text-green-500">
              Mã HS: {userData ? `${userData.examId}` : "N/A"}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <FlatList
          data={tabData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTabPress(item.title)}
              className={`px-4 py-1 border-b-2 ${
                activeTab === item.title
                  ? "border-green-600"
                  : "border-transparent"
              }`}
            >
              <Text
                className={`text-lg ${
                  activeTab === item.title ? "font-bold " : ""
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
      </View>

      {/* Scrollable Content */}
      {userData == null && (
        <View className="flex-1 bg-white justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/11202/11202705.png",
            }}
            className="w-40 h-40"
          />
        </View>
      )}
      {userData != null && (
        <>
          <ScrollView className="flex-1 bg-white">
            {/* Content based on activeTab */}
            {activeTab === "Kết quả khám" && (
              <View>
                <Text className="text-xl font-bold mx-4 mb-3 mt-6">
                  {userData.examTitle}
                </Text>
                <View className="bg-gray-100 px-4 pt-2 rounded-lg mx-4">
                  {userData.kqkData.map((item, index) => (
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

            {activeTab === "Kết quả CDHA và thăm dò chức năng" && (
              <View className="mt-2">
                {userData.cdhaData.map((item, index) => (
                  <View
                    key={index}
                    className="bg-gray-100 px-4 pt-2 rounded-lg mx-4 mt-6"
                  >
                    <View className="mb-3">
                      <TouchableOpacity className="border-b border-gray-300 pb-2 flex-row items-center justify-between">
                        <Text className="text-lg font-bold">{item.title}</Text>
                      </TouchableOpacity>
                      <View className="pt-2 ml-4">
                        <Text className="text-base font-bold">KỸ THUẬT: </Text>
                        <Text className="text-base">-- {item.technique}</Text>
                        <Text className="text-base font-bold">MÔ TẢ:</Text>
                        {item.description.map((desc, i) => (
                          <Text key={i} className="text-base">
                            -- {desc}
                          </Text>
                        ))}
                        <Text className="text-base font-bold">KẾT LUẬN:</Text>
                        <Text className="text-base">-- {item.conclusion}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeTab === "Đơn thuốc" && (
              <View>
                <Text className="text-xl font-bold mx-4 mb-3 mt-6">
                  {userData.prescriptionTitle}
                </Text>
                <View className="bg-gray-100 px-4 pt-2 rounded-lg mx-4">
                  <View className="flex-row">
                    <Text className="w-1/6 font-bold text-lg text-left">
                      STT
                    </Text>
                    <Text className="w-3/6 font-bold text-lg text-left">
                      Tên thuốc
                    </Text>
                    <Text className="w-2/6 font-bold text-lg text-right">
                      Số lượng
                    </Text>
                  </View>
                  {userData.dtData.map((item, index) => (
                    <View
                      key={item.id}
                      className={`flex-row ${
                        index === userData.dtData.length - 1 ? "" : "border-b"
                      } border-gray-300 py-2`}
                    >
                      <View className="w-1/6 justify-center items-center pr-7">
                        <Text className="font-bold text-base">{item.id}</Text>
                      </View>
                      <View className="w-3/6 px-1">
                        <Text className="font-bold text-left text-lg">
                          {item.name}
                        </Text>
                        <Text className="text-left text-base">
                          {item.dosage}
                        </Text>
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
        </>
      )}

      {/* Footer Navigation */}
      <View className="px-4 py-3">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="flex-row" onPress={() => {}}>
            <Ionicons name="arrow-back" color="#6b7280" size={24} />
            <Text className="text-base ml-1 text-gray-500">
              Xem lần khám cũ hơn
            </Text>
          </TouchableOpacity>
          <Text className="text-3xl text-gray-500">|</Text>
          <TouchableOpacity className="flex-row" onPress={() => {}}>
            <Text className="text-base mr-1 text-gray-500">
              Xem lần khám mới hơn
            </Text>
            <Ionicons name="arrow-forward" color="#6b7280" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HealthReport;
