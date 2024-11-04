import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Animated,
  Pressable,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import DoctorDetail from '../../Components/DoctorDetail';
import Calendar from '../../Components/Calendar';
import FilterDoctor from './FilterDoctor';
import CustomFlatlist from '../../Components/CustomFlatlist';
import apiClient from '../../api/apiClient';

const initialFilters = {
  price: '',
  specialty: '',
  numberPfMedicalAppointments: 'asd',
  reviews: '',
};

const DoctorSchedule = ({ navigation }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showSpecialty, setShowSpecialty] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  });
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 700,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };


  const callApi = useCallback(
    async (data) => {
      try {
        const response = await apiClient.post(`doctors/filter`, {
          ...filters,
          date: date,
          pageSize: data.skip,
          limit: data.limit
        });
        const result = await response.data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    [filters, date]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="px-2 pt-4  gap-3 flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-1 flex-row items-center rounded-md px-3 py-1 justify-center bg-gray-200">
          <Fontisto name="search" size={15} color="black" />
          <TextInput
            onChangeText={setSearch}
            value={search}
            className="ml-3"
            placeholder="Chuyên khoa, triệu chứng, bác sĩ"
          />
        </View>
        <Pressable onPress={openModal} className="flex flex-row">
          <AntDesign name="filter" size={20} color="black" />
          <Text>Lọc</Text>
          <Modal transparent={true} visible={modalVisible} animationType="none">
            <View style={styles.modalContainer}>
              <Pressable onPress={closeModal} />

              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <View></View>
                <View className=" flex flex-row mb-4">
                  {showSpecialty && (
                    <TouchableOpacity
                      onPress={() => {
                        setShowSpecialty(false);
                      }}
                    >
                      <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                  )}

                  <Text className="flex-1 text-center border-b border-gray-100 pb-4">
                    Lọc
                  </Text>
                  <Pressable onPress={closeModal}>
                    <AntDesign name="close" size={20} color="black" />
                  </Pressable>
                </View>
                <FilterDoctor
                  closeModal={closeModal}
                  setShowSpecialty={setShowSpecialty}
                  setFilters={setFilters}
                  showSpecialty={showSpecialty}
                  initialFilters={filters}
                />
              </Animated.View>
            </View>
          </Modal>
        </Pressable>
      </View>
      <View className="px-4 mt-4">
        <Calendar setDate={setDate} date={date} />
      </View>
      <View className="px-4 mb-40 mt-4 ">
        <CustomFlatlist
          limit={5}
          callApi={callApi}
          showsVerticalScrollIndicator={true}
          dependency={[filters, date]}
          hiddenOutOfList={true}
          renderItem={({item}) => {
            return <DoctorDetail item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonBottom: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  listContainer: {
    maxHeight: 550,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default DoctorSchedule;
