import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const TimeSlotComponent = ({ time, setTime }) => {
  const generateTimeSlots = (startHour, startMinute, endHour, endMinute) => {
    const slots = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const formattedTime = `${currentHour
        .toString()
        .padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      slots.push(formattedTime);

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return slots;
  };

  const data = [
    {
      id: 'morning',
      title: 'Buổi Sáng',
      timeSlots: generateTimeSlots(7, 0, 12, 0),
    },
    {
      id: 'afternoon',
      title: 'Buổi Chiều',
      timeSlots: generateTimeSlots(13, 30, 17, 30),
    }
  ];

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
        {item.title}
      </Text>
      <FlatList
        data={item.timeSlots}
        keyExtractor={(time) => time}
        numColumns={4}
        renderItem={({ item: timeSlot }) => (
          <TouchableOpacity
            onPress={() => {
              if(timeSlot == time){
                setTime('')
              }else{
                setTime(timeSlot)
              }
              
            }}
          
            >
            <View
              className={`${time == timeSlot ? 'bg-green-400' : ''}`}
              style={styles.timeSlotContainer}
            >
              <Text
                className={`${time == timeSlot ? 'text-white' : 'bg-white'}`}
                style={styles.timeSlot}
              >
                {timeSlot}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const slotWidth = (screenWidth - 100) / 4;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  timeSlotContainer: {
    width: slotWidth,
    marginBottom: 10,
    marginRight: 10,
  },
  timeSlot: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default TimeSlotComponent;
