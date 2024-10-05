import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthReport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kết quả khám</Text>
      <Text style={styles.description}>Tìm thêm kết quả khám từ bệnh viện, phòng khám</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'grey',
  },
});

export default HealthReport;
