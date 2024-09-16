import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  const [text, setText] =  useState('');
  useEffect (() => {
    const testApi = async () => {
      const url = "http://192.168.1.6:5000/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
    }
     testApi();
  },[])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>HOME</Text>
        <Button
          title="Go to Test"
          onPress={() => navigation.navigate('Test')}
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
