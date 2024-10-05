import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Button, Image } from 'react-native';
import { uploadImage } from './uploadImage'; // Import hàm upload (sẽ tạo sau)

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Chọn ảnh từ thư viện
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Kiểm tra kết quả, `result.canceled` là `true` khi người dùng hủy, `false` khi chọn thành công
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Sử dụng `assets[0].uri` để lấy URI của ảnh
    }
  };

  return (
    <View>
      <Button title="Chọn ảnh" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Tải lên Firebase" onPress={() => uploadImage(image)} />
    </View>
  );
};

export default ImageUploader;
