import React from 'react'
import { View, TouchableOpacity,Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomHeader = ({ navigate ,title}) => {
  return (
    <View className="bg-green-500 pt-10 pb-4 px-2 flex flex-row items-center">
    <TouchableOpacity
      onPress={navigate}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>

    <Text className="text-2xl flex-1 text-center font-medium  text-white">
      {title}{' '}
    </Text>
  </View>
  )
}

export default CustomHeader
