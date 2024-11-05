import React, { useEffect, useState } from 'react';
import {
  View,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import apiClient from '../../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
const services = [
  {
    id: 1,
    name: 'Gói chăm sóc dự phòng cho người cao tuổi tại nhà - 1 năm',
    price: '21.600.000 đ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2Fkb-17004613073322019317543.png?alt=media&token=caf56b55-d9d1-45e0-b70b-e269fd4df288', // Đường dẫn đến ảnh dịch vụ
  },
  {
    id: 2,
    name: 'Khám nội cho Khách nước ngoài tại nhà',
    price: '1.000.000 đ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2Fkhamb-17005548545201638164178.jpg?alt=media&token=7fcf02af-7fc7-40e8-b86e-371037b53928',
  },
  {
    id: 3,
    name: 'Khám nội cho Khách nước ngoài tại Phòng khám',
    price: '750.000 đ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2FGia-giuong-benh.jpg?alt=media&token=fe8e6d26-0a00-459e-bad8-fbdd05237f1a',
  },
  {
    id: 4,
    name: 'Khám nội khoa tại Phòng khám',
    price: '350.000 đ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2Fhinh-tin-tuc.png?alt=media&token=1b0e0aaf-f742-49bc-ae42-0e0c9361f2b9',
  },
  {
    id: 5,
    name: 'Khám nội tại Phòng khám - Ngoài giờ',
    price: '500.000 đ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mealstogo-b034d.appspot.com/o/images%2Fdich-vu-kham-benh-tai-phong-kham.jpg?alt=media&token=93159e5f-6fcf-4323-844d-d04887dfebe7',
  },
];
const HospitalDetail = ({ route }) => {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { hospital } = route.params;
  const renderService = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>Giá dịch vụ: {item.price}</Text>
      </View>
    </View>
  );

  // Hàm gọi API để lấy dữ liệu bệnh viện
  const fetchHospitalData = async () => {
    try {
      const response = await apiClient.get(
        `/hospitals/${hospital}`
      );
      setHospitalData(response.data); // Lưu dữ liệu từ API vào state
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchHospitalData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator size="large" color="#2F80ED" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView style={styles.container}>
        {hospitalData && (
          <>
            {/* Phần thông tin chính */}
            <View style={styles.header}>
              <Text style={styles.title}>{hospitalData.name}</Text>
              <View className="justify-center items-center">
                {hospitalData.picture ? (
                  <Image
                    source={{ uri: hospitalData.picture }}
                    style={styles.hospitalImage}
                  />
                ) : (
                  <Image
                    source={{ uri: 'https://via.placeholder.com/50' }}
                    style={styles.hospitalImage}
                  />
                )}
              </View>

              <View style={styles.stats}>
                <Text style={styles.statText}>Địa chỉ</Text>
                <Text style={styles.statText}>Liên hệ</Text>
              </View>
              <View style={styles.statNumbers}>
                <Text style={styles.statNumber}>{hospitalData.address}</Text>
                <Text style={styles.statNumber}>{hospitalData.contact}</Text>
              </View>
            </View>

            {/* Địa chỉ và thông tin */}
            <View style={styles.addressSection}>
              <Text style={styles.address}>{hospitalData.address}</Text>
              <Text style={styles.address}>{hospitalData.Note}</Text>
              <TouchableOpacity
                onPress={() => {
                  const url = hospitalData.website.startsWith('http')
                    ? hospitalData.website
                    : `http://${hospitalData.website}`;
                  Linking.openURL(url).catch((err) => {
                    console.error('Không thể mở URL:', err);
                  });
                }}
              >
                <Text style={styles.linkText}>
                  Website: {hospitalData.website}
                </Text>
              </TouchableOpacity>
              <Text style={styles.time}>Email: {hospitalData.email}</Text>
              <Text style={styles.infoLink}>Loại cơ sở: Bệnh Viện</Text>
            </View>

            {/* Dịch vụ */}
            <View style={styles.servicesSection}>
              <Text style={styles.sectionTitle}>Đặt theo dịch vụ</Text>
              <FlatList
                data={services}
                renderItem={renderService}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    color: '#777',
    flex: 1,
    textAlign: 'center',
  },
  statNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statNumber: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  addressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#2F80ED',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  infoLink: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  otherBranches: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  branchName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  hospitalImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 25,
  },
  servicesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#777',
  },
});
export default HospitalDetail;
