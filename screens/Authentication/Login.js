import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../Components/Input';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../../Components/Button';
import apiClient from '../../api/apiClient';
const Login = ({ navigation }) => {
  const [text, setText] = useState({ accountText: '', password: '' });
  const [loading, setLoading] = useState(false) 
   
  const submitForm = async () => {
    setLoading(true);
     try {
      const response = await apiClient.post('/auth/login', {
        username: text.accountText,  // Gửi tài khoản
        password: text.password,        // Gửi mật khẩu
      });
      console.log(response.data)
     } catch (error) {
      console.log(error.response.data);
     } finally {
      setLoading(false);
     }

  }


  return (
    <SafeAreaView style={{ flex: 1 }} className="px-4">
      <View>
        <Input
          text={text.accountText}
          setText={(text) => setText((oldValue) => ({ ...oldValue, accountText: text }))}
          placeholder={'Nhập số điện thoại/ Tên đăng nhập'}
          Icon={MaterialCommunityIcons}
          iconName="account-outline"
          iconSize={28}
        />
        <Input
          text={text.password}
          setText={(text) => setText((oldValue) => ({ ...oldValue, password: text }))}
          placeholder={'Nhập mật khẩu'}
          Icon={Ionicons}
          iconName="lock-closed-sharp"
          iconSize={28}
        />
      </View>
      <Button text="Đăng Nhập" disabled={false} loading={loading}  onPressFunction={submitForm}/>
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <View className="flex-1 h-px bg-gray-300" />
      </View>
      <View>
        <Text className="text-center font-bold">
          Bạn chưa có tài khoản?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            className="text-green-500 font-bold"
          >
            {' '}
            Đăng ký{' '}
          </Text>{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
