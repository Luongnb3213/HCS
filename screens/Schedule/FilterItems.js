import React, { useEffect } from 'react';
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

const FilterItems = ({ item, pageitem }) => {
  const [search, setSearch] = React.useState('');
  const [filterArray, setfilterArray] = React.useState(item.fitlerArray);
  function removeAccents(str) {
    const accents = 'áàạảãâắằặẳẵêéèẹẻẽíìịỉĩóòọỏõôốồộổỗúùụủũýỳỵỷỹ';
    const withoutAccents = 'aaaaaaaaaeeaaaaaaiiiiiioooooouuuuuyyyy';
    return str.replace(/[\w\s]/gi, function (c) {
      return accents.indexOf(c) > -1
        ? withoutAccents.charAt(accents.indexOf(c))
        : c;
    });
  }
  useEffect(() => {
    const filteredArray = item.fitlerArray.filter((filterItem) => {
      const normalizedFilterItem = removeAccents(filterItem.toLowerCase());
      const normalizedSearch = removeAccents(search.toLowerCase());
      return normalizedFilterItem.includes(normalizedSearch);
    });


    setfilterArray(filteredArray);
  }, [search]);

  const limit = pageitem ? item.fitlerArray.length : 5;
  return (
    <View className="mb-2">
      {!pageitem ? (
        <Text className="text-xs mb-3 font-medium">{item.title}</Text>
      ) : (
        <View className="flex  border border-gray-100 flex-row items-center rounded-md m-[2%] px-3 py-1">
          <Fontisto name="search" size={15} color="black" />
          <TextInput
            onChangeText={setSearch}
            value={search}
            className="ml-3"
            placeholder={item.title}
          />
        </View>
      )}

      {item.type != 'other' && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row">
            <TextInput
              style={styles.gridItem}
              className="px-2 w-[48%] py-2 text-center"
              placeholder="Từ"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.gridItem}
              className="px-2 w-[48%] py-2 text-center"
              placeholder="Đến"
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
                <View className="mb-2 px-2 py-3" style={styles.gridItem}>
                  <TouchableOpacity>
                    <Text className="text-center">{item}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          );
        }}
      />
      {filterArray.length > 5 && !pageitem && (
        <TouchableOpacity className="mt-2">
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
