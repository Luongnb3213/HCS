import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const HealthReport = () => {
  const navigation = useNavigation();

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Kết quả khám");

  // Data for each tab
  const reportData = {
    "Kết quả khám": {
      // consultationType: "Khám Y học cổ truyền [PK]",
      preliminaryDiagnosis: "Đau lưng",
      finalDiagnosis: "M54 - Đau lưng",
      advice: "Tập thể dục theo hướng dẫn",
      location: "PK Y học cổ truyền",
      doctor: "Vũ Việt Hằng",
    },
    "Kết quả CDHA": {
      // consultationType: "Chẩn đoán hình ảnh [CDHA]",
      preliminaryDiagnosis: "Không rõ",
      finalDiagnosis: "Chưa xác định",
      advice: "Cần thêm xét nghiệm",
      location: "Khoa Chẩn đoán hình ảnh",
      doctor: "Trần Văn Hùng",
    },
    "Đơn thuốc": {
      // consultationType: "Đơn thuốc",
      preliminaryDiagnosis: "Đau lưng mãn tính",
      finalDiagnosis: "M54 - Đau lưng mãn tính",
      advice: "Uống thuốc theo chỉ dẫn",
      location: "PK Y học cổ truyền",
      doctor: "Nguyễn Thị Lan",
    },
  };

  const tabData = [
    { id: "1", title: "Kết quả khám" },
    { id: "2", title: "Kết quả CDHA và thăm dò chức năng" },
    { id: "3", title: "Đơn thuốc" },
  ];

  // Function to handle tab change
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
          <View className="px-4 py-2 flex-row">
            <View className="justify-between">
              <Text className="font-bold text-lg">Ngày khám: 04/06/2024</Text>
              <Text className="italic text-lg text-blue-500">
                Mã HS: 2406041525
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <FlatList
            data={tabData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTabPress(item.title)}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === item.title
                    ? "border-green-600"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`text-lg ${
                    activeTab === item.title ? "font-bold text-green-500" : ""
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

          {/* Consultation Details based on activeTab */}
          <View className="bg-gray-100 p-4 mt-4 rounded-lg mx-4">
            {/* <View className="flex-row justify-between pb-4">
              <Text>{reportData[activeTab].consultationType}</Text>
            </View> */}
            <View className="flex-row justify-between mb-3">
              <Text className="text-base">Chuẩn đoán sơ bộ:</Text>
              <Text className="text-base">Đau lưng</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-base">Chuẩn đoán bệnh:</Text>
              <Text className="text-base">M54 - Đau lưng</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-base">Lời dặn:</Text>
              <Text className="text-base text-right">
                Tập thể dục theo hướng dẫn
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-base">Nơi thực hiện:</Text>
              <Text className="text-base">PK Y học cổ truyền</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base">Bác sĩ:</Text>
              <Text className="text-base">Vũ Việt Hằng</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <View className="p-4">
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-row"
              onPress={() => {}}
            >
              <Ionicons name="arrow-back" size={24}/>
              <Text className="text-base">Xem lần khám cũ hơn</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row"
              onPress={() => {}}
            >
              <Text className="text-base">Xem lần khám mới hơn</Text>
              <Ionicons name="arrow-forward" size={24}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HealthReport;
