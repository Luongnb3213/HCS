import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostDetail = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      const foundPost = posts.find(p => p.id === postId);
      setPost(foundPost);
    };
    fetchPost();
  }, [postId]);

  if (!post) return null;

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
      <Text>{post.category}</Text>
      <Text>{JSON.stringify(post.tags)}</Text>
    </View>
  );
};

export default PostDetail;
