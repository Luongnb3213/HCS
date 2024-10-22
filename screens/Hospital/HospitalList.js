import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HospitalList = ({ navigation }) => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      const storedHospitals = await AsyncStorage.getItem('hospitals');
      const hospitalsData = storedHospitals ? JSON.parse(storedHospitals) : [];
      setHospitals(hospitalsData);
      setFilteredHospitals(hospitalsData); // Initialize filteredHospitals with all hospitals
    };
    fetchHospitals();
  }, []);

  // Filter hospitals by search query (name)
  const filterHospitals = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHospitals(filtered);
    } else {
      setFilteredHospitals(hospitals); // Reset when no query
    }
  };

  const handleDelete = async (id) => {
    const updatedHospitals = hospitals.filter(hospital => hospital.id !== id);
    await AsyncStorage.setItem('hospitals', JSON.stringify(updatedHospitals));
    setHospitals(updatedHospitals);
    filterHospitals(searchQuery); // Re-apply the filter
  };

  return (
    <View>
      <TextInput
        placeholder="Search by hospital name"
        value={searchQuery}
        onChangeText={filterHospitals}
        style={{ padding: 10, marginBottom: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Add Hospital" onPress={() => navigation.navigate('HospitalEdit')} />
      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('HospitalDetail', { hospitalId: item.id })}>
              <Text>{item.name}</Text>
              <Text>{item.address}</Text>
              <Text>{item.contact}</Text>
              <Text>{item.email}</Text>
              <Text>{item.website || 'No Website'}</Text>
            </TouchableOpacity>
            <Button title="Edit" onPress={() => navigation.navigate('HospitalEdit', { hospital: item })} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default HospitalList;
