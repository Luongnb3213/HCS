import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

const CustomFlatlist = ({
  renderItem,
  callApi,
  limit,
  dependency,
  hiddenOutOfList,
  showsVerticalScrollIndicator = true,
  RenderEmptyList = () => {
    return <Text>Danh sách trống</Text>;
  },
}) => {
  const [data, setData] = useState([]);
  const [UI, setUI] = useState(false);
  // Khi Loadmore mà hết dữ liệu =>>true
  const isStop = useRef(false);
  // Hạn chế việc loading, luôn luôn 1 api được chạy
  const isLoading = useRef(false);
  useEffect(() => {
    getData('refresh');
  }, dependency);

  const getData = async (type) => {
    if (isLoading.current == true) return; // Nếu đang loading mà vẫn gọi hàm ==> return
    if (type == 'loadMore' && isStop.current == true) return; // Khi hết dữ liệu ==> return
    if (type == 'refresh') {
      setData([]);
      isStop.current = false;
    }
    try {
      setUI(true);
      isLoading.current = true;
      //call api
      const response = await callApi({
        skip: type == 'loadMore' ? data?.length : 0,
        limit: limit,
      })
     
      await new Promise((resolve) => setTimeout(resolve, 1000));
      isLoading.current = false;
      if (response?.length == 0 ) {
        isStop.current = true;
      }
      if (type == 'refresh') {
        setData(response);
      }
      if (type == 'loadMore') {
        setData(data.concat(response));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUI(false);
    }
  };

  const renderFooterList = useMemo(() => {
    if (UI)
      return (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator color={'red'} />
        </View>
      );
    if (data?.length == 0 && isStop.current) return <RenderEmptyList />;
    if (isStop.current)
      return (
        <Text className={`${hiddenOutOfList ? 'hidden' : ''}`}>
          Danh sách đã hết
        </Text>
      );
    return <View />;
  }, [UI]);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, idx) => idx + ''}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          getData('loadMore')
        } }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => getData('refresh')}
          />
        }
        ListFooterComponent={
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            {renderFooterList}
          </View>
        }
      />
    </View>
  );
};

export default CustomFlatlist;
