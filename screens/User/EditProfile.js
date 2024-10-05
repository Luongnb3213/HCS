import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import { Picker } from '@react-native-picker/picker';


const EditProfile = () => {
  const [name, setName] = useState("29 NGUYEN BAO LONG");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Nam");
  const [dob, setDob] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [nationality, setNationality] = useState("");
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Nút back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.headerTitle}>Sửa thông tin</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://your-profile-image-url" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          {/* <Image source={require('./assets/icon_camera.png')} style={styles.icon} /> */}
        </TouchableOpacity>
      </View>

      {/* CCD Scan */}
      <TouchableOpacity style={styles.ccdScan}>
        {/* <Image source={require('./assets/icon_scan.png')} style={styles.scanIcon} /> */}
        <Text style={styles.scanText}>Quét CCCD để nhập nhanh thông tin</Text>
      </TouchableOpacity>

      {/* Form Fields */}
      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>Họ và tên *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Họ và tên"
        />

        {/* Phone */}
        <Text style={styles.label}>Số điện thoại *</Text>
        <View style={styles.phoneInput}>
          <Text style={styles.phoneCode}>+84</Text>
          <TextInput
            style={styles.phoneTextInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Số điện thoại"
          />
        </View>

        {/* Date of Birth */}
        <Text style={styles.label}>Ngày sinh *</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="Chọn ngày sinh"
        />

        {/* Gender */}
        <View style={styles.genderSection}>
          <Text style={styles.label}>Giới tính *</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Nam" ? styles.selected : {},
              ]}
              onPress={() => setGender("Nam")}
            >
              <Text style={styles.genderText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "Nữ" ? styles.selected : {},
              ]}
              onPress={() => setGender("Nữ")}
            >
              <Text style={styles.genderText}>Nữ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ID Number */}
        <Text style={styles.label}>Số Căn cước/ CMTND</Text>
        <TextInput
          style={styles.input}
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Nhập Số Căn cước/ CMTND"
        />
        <TouchableOpacity style={styles.idScanIcon}>
          {/* <Image source={require('./assets/icon_scan.png')} style={styles.scanIcon} /> */}
        </TouchableOpacity>

        {/* Address */}
        <Text style={styles.label}>Địa chỉ *</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Chọn địa chỉ"
        />

        {/* Ethnicity and Nationality */}
        <View style={styles.row}>
          {/* <View style={styles.column}>
                        <Text style={styles.label}>Dân tộc *</Text>
                        <Picker
                            selectedValue={ethnicity}
                            style={styles.picker}
                            onValueChange={(itemValue) => setEthnicity(itemValue)}
                        >
                            <Picker.Item label="Chọn dân tộc" value="" />
                            <Picker.Item label="Kinh" value="Kinh" />
                            <Picker.Item label="Tày" value="Tày" />
                            <Picker.Item label="Thái" value="Thái" />
                        </Picker>
                    </View> */}
          {/* <View style={styles.column}>
                        <Text style={styles.label}>Quốc tịch *</Text>
                        <Picker
                            selectedValue={nationality}
                            style={styles.picker}
                            onValueChange={(itemValue) => setNationality(itemValue)}
                        >
                            <Picker.Item label="Chọn quốc tịch" value="" />
                            <Picker.Item label="Việt Nam" value="Việt Nam" />
                            <Picker.Item label="USA" value="USA" />
                            <Picker.Item label="Japan" value="Japan" />
                        </Picker>
                    </View> */}
        </View>
      </View>

      {/* Complete Button */}
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.completeButtonText}>Hoàn thành</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row', // Đặt các phần tử theo hàng ngang
    alignItems: 'center', // Can giữa theo trục dọc
    justifyContent: 'center', // Can giữa nội dung theo trục ngang
    backgroundColor: '#1abc9c',
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute', // Đặt nút back ở bên trái
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 140,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  icon: {
    width: 25,
    height: 25,
  },
  ccdScan: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginHorizontal: 20,
  },
  scanIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  scanText: {
    fontSize: 14,
    color: "#333",
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
  },
  phoneCode: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  phoneTextInput: {
    flex: 1,
    padding: 10,
  },
  genderSection: {
    marginBottom: 15,
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  selected: {
    backgroundColor: "#1abc9c",
  },
  genderText: {
    color: "#333",
  },
  idScanIcon: {
    position: "absolute",
    right: 30,
    top: 45,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  completeButton: {
    backgroundColor: "#1abc9c",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditProfile;
