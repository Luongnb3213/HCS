import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { getDistance } from 'geolib';

// Bộ nhớ đệm đơn giản
const hospitalCache = {};

const HospitalMap = ({ hospitalName }) => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'pk.92bcfec23304f2813144d8dabe56ebb4';  // API Key của bạn

  // Hàm để lấy tọa độ người dùng hiện tại
  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      return location.coords; // Trả về tọa độ người dùng
    } catch (error) {
      setError('Error fetching user location');
    }
  };

  // Hàm để tìm tọa độ của bệnh viện dựa trên tên
  const getHospitalLocation = async (hospitalName) => {
    // Kiểm tra nếu bệnh viện đã có trong cache
    if (hospitalCache[hospitalName]) {
      return hospitalCache[hospitalName];
    }

    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: API_KEY,
          q: hospitalName,
          format: 'json',
          countrycodes: 'VN',
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const hospitalCoords = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

        // Lưu vào bộ nhớ đệm
        hospitalCache[hospitalName] = hospitalCoords;

        return hospitalCoords;
      } else {
        setError('Hospital not found');
      }
    } catch (error) {
      // Nếu lỗi từ API
      if (error.response && error.response.status === 429) {
        setError('Rate limit exceeded. Please try again later.');
      } else {
        setError('Error fetching hospital location');
      }
    }
  };

  // Hàm tính toán quãng đường giữa vị trí người dùng và bệnh viện
  const calculateDistance = async () => {
    const userCoords = await getUserLocation();
    if (!userCoords) return;

    const hospitalCoords = await getHospitalLocation(hospitalName);
    if (!hospitalCoords) return;

    const distanceInMeters = getDistance(
      { latitude: userCoords.latitude, longitude: userCoords.longitude },
      { latitude: hospitalCoords.latitude, longitude: hospitalCoords.longitude }
    );

    // Đổi quãng đường từ mét sang km và làm tròn đến 2 chữ số thập phân
    setDistance((distanceInMeters / 1000).toFixed(2));
  };

  useEffect(() => {
    if (hospitalName) {
      calculateDistance();
    }
  }, [hospitalName]);

  if (error) {
    return <Text>0.00 km</Text>;
  }

  return (
    <View>
      {distance ? (
        <Text>{distance} km</Text>
      ) : (
        <Text>Đang tính toán quãng đường...</Text>
      )}
    </View>
  );
};

export default HospitalMap;
