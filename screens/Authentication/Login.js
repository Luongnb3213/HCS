import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../Components/Input';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Login = ({ navigation }) => {
  const [text, setText] = useState({ accountText: '', password: '' });

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
