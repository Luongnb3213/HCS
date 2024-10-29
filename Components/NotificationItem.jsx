import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const NotificationItem = ({ item }) => {
  const navigation = useNavigation();
  const title = {
      APPOINTMENT: "APPOINTMENT",
      MEDICATION: "MEDICATION",
      GENERAL: "GENERAL"
  }
  const date = new Date(item.createdAt);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('medicalSchedule')
    }} style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{item.user.username.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title[item.notificationType]}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={styles.message}>{item.content}</Text>
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
