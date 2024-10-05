import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Animated,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FilterItems from './FilterItems';

const DoctorSchedule = ({ navigation }) => {
  const [search, setSearch] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

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

  const Filters = [
    {
      title: 'Khoảng giá',
      fitlerArray: ['0 - 500K', '500k - 1000k', '1000k - 1,500k'],
      type: 'price',
    },
    {
      title: 'Chuyên khoa',
      fitlerArray: [
        'Giác mạc',
        'Dịch kính võng mạc',
        'Chấn thương mắt',
        'Giác mạc',
        'Dịch kính võng mạc',
        'Chấn thương mắt',
        'Giác mạc',
        'Dịch kính võng mạc',
        'Chấn thương mắt',
      ],
      type: 'other',
    },
    {
      title: 'Số lượt Đặt khám ',
      fitlerArray: ['Tăng dần', 'Giảm dần'],
      type: 'other',
    },
    {
      title: 'Đánh giá',
      fitlerArray: ['5 sao', 'Từ 4 sao', 'Từ 3 sao', 'Từ 2 sao', 'Từ 1 sao'],
      type: 'other',
    },
  ];

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
                  <Text className="flex-1 text-center border-b border-gray-100 pb-4">
                    Lọc
                  </Text>
                  <Pressable onPress={closeModal}>
                    <AntDesign name="close" size={20} color="black" />
                  </Pressable>
                </View>
                <View >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={100}
                  >
                    <FlatList
                      data={Filters}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => <FilterItems pageitem={false} item={item} />}
                      style={styles.listContainer}
                    />
                  </KeyboardAvoidingView>
                  <View className="flex-row items-center justify-between gap-2">
                    <TouchableOpacity
                      style={StyleSheet.buttonBottom}
                      className="px-2 w-[48%] py-3 border border-green-500 "
                    >
                      <Text className="text-center text-green-400">
                        Thiết lập lại
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={StyleSheet.buttonBottom}
                      className="px-2 w-[48%] py-3 bg-green-400"
                    >
                      <Text className="text-center text-white">Áp dụng</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="hidden">
                  <FlatList
                    data={Filters}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      return (
                        <>
                          {item.title == 'Chuyên khoa' && (
                            <FilterItems item={item} pageitem={true} />
                          )}
                        </>
                      );
                    }}
                    style={styles.listContainer}
                  />
                </View>
              </Animated.View>
            </View>
          </Modal>
        </Pressable>
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
