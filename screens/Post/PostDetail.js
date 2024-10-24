import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [userRole, setUserRole] = useState(null);

  // Fetch the post details
  useEffect(() => {
    const fetchPost = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      const foundPost = posts.find(p => p.id === postId);
      setPost(foundPost);
    };
    fetchPost();
  }, [postId]);

  // Fetch the comments related to the post
  useEffect(() => {
    const fetchComments = async () => {
      const storedComments = await AsyncStorage.getItem('comments');
      const allComments = storedComments ? JSON.parse(storedComments) : [];
      const postComments = allComments.filter(comment => comment.postId === postId);
      setComments(postComments);
    };
    fetchComments();
  }, [postId]);

  // Fetch the user role to determine if the reply button should be shown
  useEffect(() => {
    const fetchUserRole = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        setUserRole(user.role); // Assuming user object has a role field
      }
    };
    fetchUserRole();
  }, []);

  if (!post) return null;

  return (
    <View>
      {/* Post details */}
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
      <Text>{post.category}</Text>
      <Text>{JSON.stringify(post.tags)}</Text>

      {/* Comments list */}
      <Text>Comments:</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>User {item.userId}:</Text>
            <Text>{item.content}</Text>
            <Text>Likes: {item.likes}</Text>
          </View>
        )}
      />

      {/* Button for Doctors to add a comment */}
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
