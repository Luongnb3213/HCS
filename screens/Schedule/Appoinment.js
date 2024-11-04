import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Appointment = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsCancelled(true);
      setIsLoading(false);
      setConfirmModalVisible(false);
    }, 2000);
  };

  if (isCancelled) {
    return null;
  }

  const openLink = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View className="mb-3">
      <View className={`mb-5`}>
        <Text className={`text-lg font-bold text-blue-500 mb-2`}>
          <Icon name="calendar-check-o" size={20} color="#007bff" /> 
          Thông tin cuộc hẹn
        </Text>
        <Text className={`text-sm text-gray-600 mb-1`}>
          <Icon name="clock-o" size={16} color="#666" /> Thời gian:{' '}
          {new Date(item.appointmentDate).toLocaleDateString()}
        </Text>
        <Text className={`text-sm text-gray-600 mb-1`}>
          <Icon name="clock-o" size={16} color="#666" /> Giờ:{' '}
          {new Date(item.appointmentDate).toLocaleTimeString()}
        </Text>
        <Text className={`text-sm text-gray-600 mb-1`}>
          <Icon name="heartbeat" size={16} color="#666" /> Lý do: {item.reason}
        </Text>
        <Text className={`text-sm font-bold text-black mb-1`}>
          <Icon
            name="info-circle"
            size={16}
            className="mr-1"
            color={item.status === 'CONFIRMED' ? '#28a745' : '#dc3545'}
          />
          Trạng thái: {item.status}
        </Text>
      </View>
      <View className="flex flex-row gap-3">
        <TouchableOpacity
          className={`bg-blue-500 flex-row items-center p-2 rounded`}
          onPress={() => setModalVisible(true)} // Khi bấm, setModalVisible = true
        >
          <Icon name="info-circle" size={16} color="#fff" />
          <Text className={`text-white font-bold ml-2`}>Thông tin bác sĩ</Text>
        </TouchableOpacity>
        <View className={`flex-row justify-around`}>
          <TouchableOpacity
            className={`bg-red-500 flex-row items-center p-2 rounded`}
            onPress={() => setConfirmModalVisible(true)}
          >
            <Icon name="times-circle" size={16} color="#fff" />
            <Text className={`text-white font-bold ml-2`}>
              Huỷ Cuộc hẹn
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)} // Đóng popup khi nhấn nút quay lại trên Android
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text className={`text-lg font-bold text-gray-800 mb-4`}>
              Xác nhận huỷ
            </Text>
            <Text className={`text-sm text-gray-600 mb-4`}>
            Bạn có chắc chắn muốn hủy cuộc hẹn này không?
            </Text>

            {/* Nút xác nhận hủy */}
            <TouchableOpacity
              className={`bg-red-500 flex-row justify-center items-center p-2 rounded mb-4`}
              onPress={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" /> 
              ) : (
                <>
                  <Icon name="times-circle" size={16} color="#fff" />
                  <Text className={`text-white font-bold ml-2`}>
                  Có, Hủy
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Nút không hủy */}
            <TouchableOpacity
              disabled={isLoading}
              className={`bg-gray-300 flex-row  justify-center items-center p-2 rounded`}
              onPress={() => setConfirmModalVisible(false)} // Đóng popup mà không hủy
            >
              <Icon name="times-circle" size={16} color="#666" />
              <Text className={`text-gray-800 font-bold ml-2`}>
              Không, quay lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text className={`text-lg font-bold text-blue-500 mb-2`}>
              <Icon name="user-md" size={20} color="#007bff" />
              Thông tin bác sĩ
            </Text>
            <Text className={`text-sm text-gray-600 mb-1`}>
              Bác sĩ: <Text>{item.doctor.user.fullName}</Text>
            </Text>
            <Text>Chuyên ngành: {item.doctor.specialty}</Text>

            <TouchableOpacity onPress={() => openLink(item.doctor.bio)}>
              <Text className={`text-sm text-blue-500 underline mb-1`}>
                {item.doctor.bio}
              </Text>
            </TouchableOpacity>
            <Text className={`text-sm text-gray-600 mb-1`}>
              <Icon name="graduation-cap" size={16} color="#666" /> Kinh nghiệm:{' '}
              {item.doctor.experienceYears} years
            </Text>
            <Text className={`text-sm text-gray-600 mb-1`}>
              <Icon name="star" size={16} color="#f8d825" /> Đánh giá:{' '}
              {item.doctor.rating} ★
            </Text>

            <TouchableOpacity
              className={`bg-red-500 flex-row items-center p-2 rounded mt-4`}
              onPress={() => setModalVisible(false)} // Đóng modal khi bấm nút
            >
              <Icon name="times-circle" size={16} color="#fff" />
              <Text className={`text-white font-bold ml-2`}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Appointment;
