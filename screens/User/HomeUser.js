import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeUser = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>HOME</Text>
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

export default HomeUser;