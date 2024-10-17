import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../api/apiClient";

const EditProfile = () => {
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

  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Nam");
  const [dob, setDob] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [nationality, setNationality] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      setProfilePicture(user.profilePicture || "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png");
      setName(user.fullName || "");
      setPhone(user.phone || "");
      setGender(user.gender || "MALE");
      setDob(user.dateOfBirth || "");
      setIdNumber(user.idNumber || "");
      setAddress(user.address || "");
      setEthnicity(user.ethnicity || "");
      setNationality(user.nationality || "");
    }
  }, [user]);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        fullName: name,
        phone: phone,
        gender: gender,
        dateOfBirth: dob,
      };

      const response = await apiClient.put(`/users/${userId}`, updatedUser);
      console.log("data:", response.data.message);
      navigation.goBack();
    } catch (error) {
      console.log("Error updating user data:", error);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    if (cleaned.length === 10 && cleaned.startsWith("0")) {
      const withoutZero = cleaned.substring(1);
      return withoutZero.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    if (cleaned.length === 9) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    return cleaned;
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-center bg-green-500 px-4 py-3 relative">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Sửa thông tin</Text>
      </View>

      <View className="items-center my-5">
        <Image
          source={{ uri: profilePicture }}
          className="w-24 h-24 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-28 p-1 bg-white rounded-full">
          {/* Icon camera */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="flex-row items-center justify-center p-2 bg-gray-300 rounded mx-5">
        <Text className="text-base text-gray-700">
          Quét CCCD để nhập nhanh thông tin
        </Text>
      </TouchableOpacity>

      <View className="px-5 mt-5">
        <Text className="text-base mb-2">Họ và tên *</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={name}
          onChangeText={setName}
          placeholder="Họ và tên"
        />

        <Text className="text-base mb-2">Số điện thoại *</Text>
        <View className="flex-row items-center border border-gray-300 rounded mb-4">
          <Text className="px-3 border-r border-gray-300 text-base">+84</Text>
          <TextInput
            className="flex-1 p-2"
            value={formatPhoneNumber(phone)}
            onChangeText={(text) => setPhone(formatPhoneNumber(text))}
            keyboardType="phone-pad"
            placeholder="Số điện thoại"
          />
        </View>

        <Text className="text-base mb-2">Ngày sinh *</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={dob}
          onChangeText={setDob}
          keyboardType="phone-pad"
          placeholder="Chọn ngày sinh"
        />

        <View className="mb-4">
          <Text className="text-base mb-2">Giới tính *</Text>
          <View className="flex-row justify-around">
            <TouchableOpacity
              className={`py-2 px-6 border border-gray-300 rounded ${
                gender === "MALE" ? "bg-green-500" : ""
              }`}
              onPress={() => setGender("MALE")}
            >
              <Text
                className={`${
                  gender === "MALE" ? "text-white" : "text-gray-700"
                }`}
              >
                Nam
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-2 px-6 border border-gray-300 rounded ${
                gender === "FEMALE" ? "bg-green-500" : ""
              }`}
              onPress={() => setGender("FEMALE")}
            >
              <Text
                className={`${
                  gender === "FEMALE" ? "text-white" : "text-gray-700"
                }`}
              >
                Nữ
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-base mb-2">Số Căn cước/ CMTND</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Nhập Số Căn cước/ CMTND"
        />

        <Text className="text-base mb-2">Địa chỉ *</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={address}
          onChangeText={setAddress}
          placeholder="Chọn địa chỉ"
        />
      </View>

      <TouchableOpacity
        className="bg-green-500 p-3 rounded mx-5 mt-5 items-center"
        onPress={handleUpdateUser}
      >
        <Text className="text-white text-base">Hoàn thành</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
