import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostForm from '../components/PostForm.jsx';
import { v4 as uuidv4 } from 'uuid';

const PostEdit = ({ route, navigation }) => {
  const { post } = route.params || {};

  const handleSubmit = async (postData) => {
    let posts = await AsyncStorage.getItem('posts');
    posts = posts ? JSON.parse(posts) : [];

    if (post) {
      // Update existing post
      const index = posts.findIndex(p => p.id === post.id);
      posts[index] = { ...posts[index], ...postData, updatedAt: new Date().toISOString() };
    } else {
      // Create new post
      const newPost = {
        id: uuidv4(),
        userId: 'someUserId', // Thay đổi thành ID người dùng thực tế
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        commentsCount: 0,
        ...postData,
      };
      posts.push(newPost);
    }

    await AsyncStorage.setItem('posts', JSON.stringify(posts));
    navigation.navigate('PostList');
  };

  return (
    <View>
      <PostForm onSubmit={handleSubmit} initialValues={post} />
    </View>
  );
};

export default PostEdit;
