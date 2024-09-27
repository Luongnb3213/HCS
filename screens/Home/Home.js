import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  const [text, setText] =  useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.baseText}>
        <Text className="text-6xl text-green-700">HOME</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Authentication')}
        />
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
