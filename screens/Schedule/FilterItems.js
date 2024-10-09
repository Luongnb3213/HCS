import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

const FilterItems = ({
  filtersElement,
  pageitem,
  filter,
  dispatch,
  setShowSpecialty = () => {},
}) => {
  const [search, setSearch] = React.useState('');
  const [filterArray, setfilterArray] = React.useState(
    filtersElement.fitlerArray
  );
  function removeAccents(str) {
    const accents = 'áàạảãâắằặẳẵêéèẹẻẽíìịỉĩóòọỏõôốồộổỗúùụủũýỳỵỷỹ';
    const withoutAccents = 'aaaaaaaaaeeaaaaaaiiiiiioooooouuuuuyyyy';
    return str.replace(/[\w\s]/gi, function (c) {
      return accents.indexOf(c) > -1
        ? withoutAccents.charAt(accents.indexOf(c))
        : c;
    });
  }

  if (pageitem) {
    useEffect(() => {
      const filteredArray = filtersElement.fitlerArray.filter((filterItem) => {
        const normalizedFilterItem = removeAccents(
          filterItem.title.toLowerCase()
        );
        const normalizedSearch = removeAccents(search.toLowerCase());
        return normalizedFilterItem.includes(normalizedSearch);
      });

      setfilterArray(filteredArray);
    }, [search]);
  }

  const limit = pageitem ? filtersElement.fitlerArray.length : 5;

  const actionAddFilter = (value) => {
    dispatch({
      type: filtersElement.action + '_DO_TODO',
      filterValue: value,
    });
  };
  const actionRemoveFilter = (value) => {
    dispatch({
      type: 'UNDO_TODO',
      filterValue: '',
      typeFilter: value,
    });
  };
  const handleBlur = (value,type) => {
    dispatch({
      type: 'PRICE_INPUT',
      filterValue: value,
      typeFilter: type
    });
  };

  return (
    <View className="mb-2">
      {!pageitem ? (
        <Text className="text-xs mb-3 font-medium">{filtersElement.title}</Text>
      ) : (
        <View className="flex  border border-gray-100 flex-row items-center rounded-md m-[2%] px-3 py-1">
          <Fontisto name="search" size={15} color="black" />
          <TextInput
            onChangeText={setSearch}
            value={search}
            className="ml-3"
            placeholder={filtersElement.title}
          />
        </View>
      )}

      {filtersElement.type == 'price' && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row">
            <TextInput
              style={styles.gridItem}
              onEndEditing={({ nativeEvent: { text } }) => {
                handleBlur(text, "low")
              }}
              className="px-2 w-[48%] py-2 text-center"
              placeholder="Từ"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.gridItem}
              className="px-2 w-[48%] py-2 text-center"
              placeholder="Đến"
              onEndEditing={({ nativeEvent: { text } }) => {
                handleBlur(text, "high")
              }}
              keyboardType="numeric"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <FlatList
        data={filterArray}
        numColumns={2}
        keyExtractor={(element, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              {index <= limit && (
                <View
                  className={`mb-2 px-2 py-3 ${
                    filter[filtersElement.type] == item.value && 'bg-green-500'
                  }`}
                  style={styles.gridItem}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (filter[filtersElement.type] != item.value) {
                        actionAddFilter(item.value);
                      } else {
                        actionRemoveFilter(filtersElement.type);            
                      }
                    }}
                  >
                    <Text
                      className={`text-center ${
                        filter[filtersElement.type] == item.value &&
                        'text-white'
                      }`}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          );
        }}
      />
      {filterArray.length > 5 && !pageitem && (
        <TouchableOpacity
          onPress={() => {
            setShowSpecialty(true);
          }}
          className="mt-2"
        >
          <Text className="text-center">Xem thêm </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '47%',
    margin: '2%',
  },
});

export default FilterItems;
