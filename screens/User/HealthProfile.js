import React, { useEffect, useState, useContext } from "react";
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
import AuthContext from "../../constants/AuthContext";
import { usersData } from "./data";

const HealthProfile = () => {
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
    // Chỉ thực hiện khi userId thay đổi hoặc khi component render lần đầu
    if (usersData[userId]) {
      setUserData(usersData[userId]);
    } else {
      setUserData(null); // Đảm bảo `userData` là null nếu không tìm thấy userId
    }
  }, [userId]);

  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if the birth date has not yet occurred this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      {user != null && (
        <View className="flex-row items-center p-4 bg-white">
          <>
            <Image
              source={{ uri: user.profilePicture }}
              className="w-20 h-20 rounded-full"
            />
            {/* Số lần khám */}
            <View className="ml-4">
              <Text className="text-xl font-bold mb-1">{user.fullName}</Text>
              {/* <Text className="text-base mb-1">Bệnh viện Đại học Y Hà Nội</Text>
              <Text className="text-base mb-1">Mã NB: 2406005292</Text> */}
              <Text className="text-base mb-1">
                {user.gender == "MALE" ? "Nam" : "Nữ"}, {calculateAge(user.dateOfBirth)} tuổi
              </Text>
              <Text className="text-base text-gray-600">
                {userData
                  ? `${userData.visitHistory.length} Lần khám`
                  : "0 Lần khám"}
              </Text>
            </View>
          </>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-gray-100"
      >
        {/* No Health Record Section */}
        {userData == null && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2Fnot-found.png?alt=media&token=8a81ca81-321a-4ad6-b3f9-7573fdea6e17",
              }}
              className="w-40 h-40"
            />
            <Text className="text-lg text-gray-500">
              Không có hồ sơ sức khỏe
            </Text>
          </View>
        )}

        {/* Lịch sử khám */}
        {user != null && userData != null && (
          <View className="p-4">
            <>
              <Text className="font-bold text-lg">Lịch sử khám</Text>
              {userData.visitHistory.map((visit, index) => (
                <TouchableOpacity
                  key={index}
                  className="rounded-lg shadow bg-white p-4 mt-2 mb-2 flex-row"
                  onPress={() => navigation.navigate("HealthReport")}
                >
                  <Image
                    source={{ uri: user.profilePicture }}
                    className="w-16 h-16 rounded-full"
                  />
                  <View className="ml-4 justify-between">
                    <Text className="font-bold text-lg">
                      Ngày khám: {visit.date}
                    </Text>
                    <Text className="italic text-lg text-green-500">
                      Mã HS: {visit.examId}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          </View>
        )}

        {/* Options */}
        {/* <View className="p-4">
          <TouchableOpacity className="bg-green-500 p-4 rounded-full mb-2 items-center">
            <Text className="text-white text-base">Xem kết quả khám</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 p-4 rounded-full items-center">
            <Text className="text-white text-base">Tải lên hồ sơ sức khỏe</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthProfile;
