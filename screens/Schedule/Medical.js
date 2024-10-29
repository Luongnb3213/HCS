import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import apiClient from '../../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Components/CustomHeader';

const Medical = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedications = async () => {
    try {
      const response = await apiClient.get('/medication');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const renderMedicationItem = ({ item }) => {
    return (
      <View>
        {item.status === 'TAKEN' && (
          <Text style={styles.statusText}>Đã xong</Text>
        )}

        <View style={styles.timeWrapper}>
          <View style={styles.bounce} />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{item.reminderTime[0]}</Text>
          </View>
        </View>
        <View className="flex flex-row w-full">
          <View style={styles.verticalLine} />
          <View style={styles.card} className="flex flex-row justify-between items-center">
            <View className="flex flex-row">
              <Image
                source={{ uri: item.user.profilePicture }}
                style={styles.profilePicture}
              />
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{item.medicineName}</Text>
                <Text style={styles.dosage}>{item.dosage}</Text>
              </View>
            </View>
            <TouchableOpacity className="mr-5">
              <Text
                style={[
                  styles.statusIcon,
                  item.status === 'PENDING'
                    ? styles.pendingIcon
                    : styles.takenIcon,
                ]}
              >
                {item.status === 'PENDING' ? '!' : '✓'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Lịch uống thuốc'} />
      <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
        <FlatList
          data={medications}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>Không có lịch nhắc thuốc nào.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Medical;

const styles = StyleSheet.create({
  bounce: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 60,
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fedeb8',
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    width: '100%'
  },
  timeContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  verticalLine: {
    width: 3,
    backgroundColor: '#ccc',
    height: '100%',
    marginLeft: 5,
    marginRight:10 
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dosage: {
    fontSize: 14,
    color: '#999',
  },
  statusIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pendingIcon: {
    color: '#ff4500',
  },
  takenIcon: {
    color: '#28a745',
  },
});
