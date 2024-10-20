import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      const foundPost = posts.find(p => p.id === postId);
      setPost(foundPost);
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      const storedComments = await AsyncStorage.getItem('comments');
      const allComments = storedComments ? JSON.parse(storedComments) : [];
      const postComments = allComments.filter(comment => comment.postId === postId);
      setComments(postComments);
    };
    fetchComments();
  }, [postId]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        setUserRole(user.role);
      }
    };
    fetchUserRole();
  }, []);

  if (!post) return null;

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
      <Text>{post.category}</Text>
      <Text>{JSON.stringify(post.tags)}</Text>

      <Text>Comments:</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>User {item.userId}:</Text>
            <Text>{item.content}</Text>
            <Text>Likes: {item.likes}</Text>
            {userRole === 'DOCTOR' && (
              <Button
                title="Edit"
                onPress={() => navigation.navigate('CommentEdit', { commentId: item.id, postId })}
              />
            )}
          </View>
        )}
      />

      {userRole === 'DOCTOR' && (
        <Button
          title="Reply"
          onPress={() => navigation.navigate('CommentCreate', { postId })}
        />
      )}
    </View>
  );
};

export default PostDetail;
