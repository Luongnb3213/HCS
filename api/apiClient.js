import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo instance của Axios
const apiClient = axios.create({
    baseURL: 'http://192.168.0.103:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Interceptor cho request để lấy token từ AsyncStorage
// apiClient.interceptors.request.use(
//     async (config) => {
//         try {
//             // Danh sách các URL không cần token
//             const noAuthRoutes = ['/auth/login', '/auth/register'];

//             // Nếu URL không nằm trong danh sách cần auth, không gắn token
//             if (!noAuthRoutes.includes(config.url)) {
//                 const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
//                 if (token) {
//                     config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header
//                 }
//             }
//         } catch (error) {
//             console.log('Lỗi lấy token từ AsyncStorage:', error);
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default apiClient;
