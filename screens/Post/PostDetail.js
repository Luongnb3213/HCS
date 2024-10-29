import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '../../api/apiClient';
import CustomHeader from '../../Components/CustomHeader';
import AuthContext from '../../constants/AuthContext';

const PostDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  const [userId, setUserId] = useState(user.id);

  const fetchPostDetail = async () => {
    try {
      const response = await apiClient.get(`/post/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async () => {
    if (!newComment) {
      alert('Vui lòng nhập nội dung bình luận!');
      return;
    }

    try {
      const response = await apiClient.post('/comments', {
        postId: postId,
        userId: userId,
        content: newComment,
        likes: 0, // Mặc định số lượt thích là 0
      });

      const newCommentData = {
        ...response.data,
        user: {
          profilePicture: user.profilePicture, // Lấy ảnh từ người dùng đã đăng nhập
          fullName: user.fullName,
        },
      };

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newCommentData],
      }));

      setNewComment(''); // Xóa nội dung bình luận sau khi gửi
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!post) {
    return <Text>Error loading post details.</Text>;
  }

  return (
    <SafeAreaView className="flex-1">
      <CustomHeader
        navigate={() => {
          navigation.navigate('Socail');
        }}
        title={'Câu hỏi'}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: post.user.profilePicture }}
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.username}>
              {post.user.fullName},{' '}
              {new Date().getFullYear() -
                new Date(post.user.dateOfBirth).getFullYear()}{' '}
              tuổi
            </Text>
            <Text style={styles.postedAt}>
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        <Text style={styles.category}>Danh mục: {post.category}</Text>

        {/* Hiển thị bình luận nếu có */}
        {post.comments.length > 0 && (
          <View style={styles.commentContainer}>
            <Text style={styles.commentTitle}>Bình luận:</Text>
            {post.comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  style={styles.commentProfilePicture}
                />
                <View>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                  <Text style={styles.commentMeta}>
                    Thích: {comment.likes} |{' '}
                    {new Date(comment.createdAt).toLocaleTimeString()}{' '}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Form tạo bình luận mới */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        style={styles.commentInputContainer}
      >
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Nhập bình luận..."
        />
        <Button title="Gửi" onPress={handleCreateComment} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 10,
  },
  commentContainer: {
    marginTop: 20,
  },
  commentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  comment: {
    flexDirection: 'row', // Để hiển thị ảnh và nội dung bình luận theo chiều ngang
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  commentProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    fontSize: 14,
  },
  commentMeta: {
    color: '#888',
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },
});
