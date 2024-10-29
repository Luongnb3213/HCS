import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import apiClient from '../../api/apiClient'; // Đảm bảo đã import apiClient của bạn
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Components/CustomHeader';

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy dữ liệu
  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/post');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false); // Tắt loading sau khi dữ liệu đã tải xong
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PostDetail', { postId: item.id });
      }}
      style={styles.postContainer}
    >
      <View style={styles.header}>
        {/* Ảnh đại diện người đăng */}
        <Image
          source={{ uri: item.user.profilePicture }}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.username}>
            {item.user.fullName},{' '}
            {new Date(item.user.dateOfBirth).getFullYear()} tuổi
          </Text>
          <Text style={styles.postedAt}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.category}>Danh mục: {item.category}</Text>

      {/* Hiển thị số lượt xem, thích và bình luận */}
      <View style={styles.metaContainer}>
        <Text>Lượt xem: {item.views}</Text>
        <Text>Lượt thích: {item.likes}</Text>
        <Text>Bình luận: {item.commentsCount}</Text>
      </View>

      {/* Bình luận đầu tiên nếu có */}
      {item.comments.length > 0 && (
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Bình luận:</Text>
          <Text style={styles.commentContent}>{item.comments[0].content}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        navigate={() => {
          navigation.navigate('Home');
        }}
        title={'Cộng đồng hỏi đáp'}
      />
      <View className="px-[16px] mt-3">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postedAt: {
    color: '#888',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  category: {
    color: '#007BFF',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  commentContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  commentTitle: {
    fontWeight: 'bold',
  },
  commentContent: {
    marginTop: 5,
    fontSize: 15,
  },
});
