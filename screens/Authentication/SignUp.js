import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../Components/Input'; // Giả sử Input này là component bạn đã tạo sẵn
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'; // Cài đặt nếu chưa có: npm install @react-native-picker/picker

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    gender: 'MALE', // Giá trị mặc định cho gender
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Kiểm tra các trường rỗng
    if (!formData.username) newErrors.username = 'Tên đăng nhập không được để trống';
    if (!formData.email) newErrors.email = 'Email không được để trống';
    if (!formData.fullname) newErrors.fullname = 'Họ tên không được để trống';
    if (!formData.password) newErrors.password = 'Mật khẩu không được để trống';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu khớp
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSignUp = () => {
    if (validate()) {
      // Thực hiện đăng ký
      Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="px-4">
      <View>
        <Input
          text={formData.username}
          setText={(text) => setFormData({ ...formData, username: text })}
          placeholder={'Nhập tên đăng nhập'}
          Icon={MaterialCommunityIcons}
          iconName="account-outline"
          iconSize={28}
        />
        {errors.username ? <Text className="text-red-500">{errors.username}</Text> : null}

        <Input
          text={formData.email}
          setText={(text) => setFormData({ ...formData, email: text })}
          placeholder={'Nhập email'}
          Icon={MaterialCommunityIcons}
          iconName="email-outline"
          iconSize={28}
        />
        {errors.email ? <Text className="text-red-500">{errors.email}</Text> : null}

        <Input
          text={formData.fullname}
          setText={(text) => setFormData({ ...formData, fullname: text })}
          placeholder={'Nhập họ tên'}
          Icon={Ionicons}
          iconName="person-outline"
          iconSize={28}
        />
        {errors.fullname ? <Text className="text-red-500">{errors.fullname}</Text> : null}

        <Input
          text={formData.password}
          setText={(text) => setFormData({ ...formData, password: text })}
          placeholder={'Nhập mật khẩu'}
          secureTextEntry
          Icon={Ionicons}
          iconName="lock-closed-sharp"
          iconSize={28}
        />
        {errors.password ? <Text className="text-red-500">{errors.password}</Text> : null}

        <Input
          text={formData.confirmPassword}
          setText={(text) => setFormData({ ...formData, confirmPassword: text })}
          placeholder={'Xác nhận mật khẩu'}
          secureTextEntry
          Icon={Ionicons}
          iconName="lock-closed-sharp"
          iconSize={28}
        />
        {errors.confirmPassword ? <Text className="text-red-500">{errors.confirmPassword}</Text> : null}

        {/* Picker cho giới tính */}
        <View style={{ marginVertical: 10 }}>
          <Text>Giới tính</Text>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) =>
              setFormData((prevData) => ({ ...prevData, gender: itemValue }))
            }
            style={{ height: 50, width: '100%' }}
          >
            <Picker.Item label="Nam" value="MALE" />
            <Picker.Item label="Nữ" value="FEMALE" />
            <Picker.Item label="Khác" value="OTHER" />
          </Picker>
        </View>
      </View>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity onPress={handleSignUp} className="bg-green-500 p-4 rounded">
        <Text className="text-white text-center font-bold">Đăng ký</Text>
      </TouchableOpacity>

      <View>
        <Text className="text-center font-bold mt-4">
          Bạn đã có tài khoản?{' '}
          <Text onPress={() => navigation.navigate('Login')} className="text-green-500 font-bold">
            Đăng nhập
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
