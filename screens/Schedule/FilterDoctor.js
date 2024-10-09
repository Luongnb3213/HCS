import React, { useState } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FilterReducer } from '../../reducer/FilterReducer';
import FilterItems from './FilterItems';
import { Filters } from '../../constants';

const FilterDoctor = ({ initialFilters ,setShowSpecialty,showSpecialty, setFilters,closeModal }) => {
  const [filter, dispatch] = React.useReducer(FilterReducer, initialFilters);
 
  return (
    <View>
      {!showSpecialty && (
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
          >
            <FlatList
              data={Filters}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <FilterItems
                  filter={filter}
                  pageitem={false}
                  dispatch={dispatch}
                  filtersElement={item}
                  setShowSpecialty={setShowSpecialty}
                />
              )}
              style={styles.listContainer}
            />
          </KeyboardAvoidingView>
        </View>
      )}

      {showSpecialty && (
        <View className="">
          <FlatList
            data={Filters}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <>
                  {item.title == 'Chuyên khoa' && (
                    <FilterItems
                      filter={filter}
                      filtersElement={item}
                      pageitem={true}
                      dispatch={dispatch}
                    />
                  )}
                </>
              );
            }}
            style={styles.listContainer}
          />
        </View>
      )}
      <View className="flex-row items-center justify-between gap-2">
        <TouchableOpacity
          style={StyleSheet.buttonBottom}
          onPress={() => {
            setFilters(filter)
          }}
          className="px-2 w-[48%] py-3 border border-green-500 "
        >
          <Text className="text-center text-green-400">Thiết lập lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.buttonBottom}
          onPress={() => {
            setFilters(filter);
            closeModal()
          }}
          className="px-2 w-[48%] py-3 bg-green-400"
        >
          <Text className="text-center text-white">Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  listContainer: {
    maxHeight: 550,
    width: '100%',
  },
});

export default FilterDoctor;
