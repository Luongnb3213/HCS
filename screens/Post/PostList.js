import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      setPosts(storedPosts ? JSON.parse(storedPosts) : []);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <View>
      <Button title="Add Post" onPress={() => navigation.navigate('PostEdit')} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
            <Button title="Edit" onPress={() => navigation.navigate('PostEdit', { post: item })} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default PostList;
