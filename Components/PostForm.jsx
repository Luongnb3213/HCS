import React, { useState } from 'react';
import { View, TextInput, Button, Picker } from 'react-native';

const PostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues ? initialValues.title : '');
  const [content, setContent] = useState(initialValues ? initialValues.content : '');
  const [category, setCategory] = useState(initialValues ? initialValues.category : 'HEALTH_TIPS');
  const [tags, setTags] = useState(initialValues ? JSON.stringify(initialValues.tags) : '[]');

  const handleSubmit = () => {
    const postData = {
      title,
      content,
      category,
      tags: JSON.parse(tags),
    };
    onSubmit(postData);
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Health Tips" value="HEALTH_TIPS" />
        <Picker.Item label="Medical News" value="MEDICAL_NEWS" />
        <Picker.Item label="Community" value="COMMUNITY" />
      </Picker>
      <TextInput
        placeholder="Tags (JSON)"
        value={tags}
        onChangeText={setTags}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default PostForm;
