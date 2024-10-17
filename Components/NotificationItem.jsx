import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const NotificationItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>V</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Vista rewards club....</Text>
          <Text style={styles.date}>Dec 16, 2023</Text>
        </View>
        <Text style={styles.message}>
          Earn Points without making a purchase. Complete your first mission
          today!
        </Text>
      </View>
      <View style={styles.status}>
        <View style={styles.dot}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f48fb1', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
});

export default NotificationItem;
