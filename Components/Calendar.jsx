import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const Calendar = ({ title, numberDays = 14, startFromMonday = true, setDate, date }) => {
  const [dates, setDates] = useState([]);
  const screenWidth = Dimensions.get('window').width - 8 * 5;
  const itemWidth = screenWidth / 7;

  const generateDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    if (startFromMonday) {
      startOfWeek.setDate(
        currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
      );
    }

    const days = [];
    const weekdayMap = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    for (let i = 0; i < numberDays; i++) {
      const nextDay = new Date(startOfWeek);
      nextDay.setDate(startOfWeek.getDate() + i);

      const day = weekdayMap[nextDay.getDay()];
      const date = nextDay.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
      });

      const isBeforeToday = nextDay < currentDate.setHours(0, 0, 0, 0);

      days.push({ day, date, isBeforeToday });
    }

    setDates(days);
  };

  useEffect(() => {
    generateDates();
  }, []);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.header}>Bác sĩ chuyên khoa</Text>}

      <FlatList
        data={dates}
        keyExtractor={(item) => item.date}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setDate(item.date);
            }}
            disabled={item.isBeforeToday}
          >
            <View
              style={[
                styles.dateContainer,
                { width: itemWidth },
                item.isBeforeToday && styles.disabledDateContainer,
                item.date === date && styles.selectedDateContainer,
              ]}
            >
              <Text
                style={[
                  styles.day,
                  item.isBeforeToday && styles.disabledText,
                  item.date === date && styles.selectedText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  item.isBeforeToday && styles.disabledText,
                  item.date === date && styles.selectedText,
                ]}
              >
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateContainer: {
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  disabledDateContainer: {
    backgroundColor: '#f0f0f0',
  },
  selectedDateContainer: {
    backgroundColor: 'green', 
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6D6E71', 
  },
  date: {
    fontSize: 12,
    color: '#6D6E71',
  },
  disabledText: {
    color: '#cccccc',
  },
  selectedText: {
    color: '#fff', 
  },
});

export default Calendar;
