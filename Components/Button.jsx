import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Button = ({ text, buttonClassName, disabled, loading, onPressFunction }) => {
    const navigation = useNavigation(); 
  const classButton = disabled ? `bg-gray-400` : `bg-green-500`;
    const classCustom = buttonClassName ? buttonClassName : `w-full  rounded-lg ${classButton}`
  return (
    <TouchableOpacity
      className={classCustom}
      disabled={disabled}
      onPress={onPressFunction}
    >
      {loading ? (
        <ActivityIndicator size="small" className="py-4" color="#0000ff" />
      ) : (
        <Text className={`text-center font-bold px-4 text-white py-4`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
