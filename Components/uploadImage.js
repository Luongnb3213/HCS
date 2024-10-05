import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; // Import storage từ file firebase.js
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export const uploadImage = async (uri) => {
  try {
    // Lấy tên file từ đường dẫn URI
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);

    // Firebase Storage chỉ hỗ trợ file blobs hoặc buffer, nên cần chuyển đổi
    const response = await fetch(uri);
    const blob = await response.blob();

    // Tạo tham chiếu đến vị trí lưu trữ trên Firebase
    const storageRef = ref(storage, `images/${fileName}`);

    // Upload file lên Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Theo dõi tiến trình upload
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Lỗi khi tải lên:', error);
      },
      async () => {
        // Upload thành công, lấy URL của file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at:', downloadURL);
      }
    );
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
  }
};
