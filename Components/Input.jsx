import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ text, setText, placeholder, Icon, iconName, iconSize,secureTextEntry = false }) => {
  return (
    <View className="flex gap-3 flex-row py-2 border-b  ml-2 mb-4 border-b-stone-200">
      <Icon name={iconName} size={iconSize} color="black" />
      <TextInput
        onChangeText={setText}
        className="h-6 w-full"
        style={styles.input}
        value={text}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
  },
});

export default Input;
