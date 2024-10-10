import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import apiClient from "../../api/apiClient";

const HealthProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Giả sử bạn lấy userId từ AsyncStorage hoặc prop
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
    <ScrollView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        {/* Nút back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.headerTitle}>Hồ Sơ Sức Khỏe</Text>

        {/* Nút Tải lên */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => alert("Upload")}
        >
          <Text style={styles.uploadText}>Tải lên</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {user && (
          <>
            <Image
              source={{ uri: user.profilePicture }} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.fullName}</Text>
              <Text style={styles.profileDetails}>
                0 Lần khám | 0 Thành viên | BMI --
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          {/* <Image source={require('./assets/icon_result.png')} style={styles.actionIcon} /> */}
          <Text style={styles.actionText}>Xem kết quả khám</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          {/* <Image source={require('./assets/icon_health_monitor.png')} style={styles.actionIcon} /> */}
          <Text style={styles.actionText}>Theo dõi sức khỏe</Text>
        </TouchableOpacity>
      </View>

      {/* Family & Friends Health Profile */}
      <View style={styles.familySection}>
        <Text style={styles.sectionTitle}>
          Hồ sơ sức khỏe người thân, bạn bè
        </Text>
        <View style={styles.familyActions}>
          <TouchableOpacity style={styles.familyButton}>
            {/* <Image source={require('./assets/icon_family.png')} style={styles.familyIcon} /> */}
            <Text style={styles.familyText}>Bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.familyButton}>
            {/* <Image source={require('./assets/icon_add_member.png')} style={styles.familyIcon} /> */}
            <Text style={styles.familyText}>Thêm thành viên</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* No Health Record Section */}
      <View style={styles.noRecordSection}>
        {/* <Image source={require('./assets/icon_no_record.png')} style={styles.noRecordImage} /> */}
        <Text style={styles.noRecordText}>Không có hồ sơ sức khỏe</Text>
      </View>

      {/* Options */}
      <View style={styles.optionButtons}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Xem kết quả khám</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Tải lên hồ sơ sức khỏe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1abc9c",
    flexDirection: "row",
    justifyContent: "space-between", // Căn đều các phần tử trong header
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  uploadButton: {
    padding: 10,
  },
  uploadText: {
    color: "#fff",
    fontSize: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileDetails: {
    fontSize: 14,
    color: "#777",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    textAlign: "center",
  },
  familySection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  familyActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  familyButton: {
    alignItems: "center",
    width: "45%",
  },
  familyIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  familyText: {
    fontSize: 14,
    textAlign: "center",
  },
  noRecordSection: {
    alignItems: "center",
    padding: 20,
  },
  noRecordImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  noRecordText: {
    fontSize: 16,
    color: "#999",
  },
  optionButtons: {
    padding: 15,
  },
  optionButton: {
    backgroundColor: "#1abc9c",
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HealthProfile;
