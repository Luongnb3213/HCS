import axios from 'axios';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../constants/AuthContext';

const apiClient = axios.create({
  baseURL: 'http://192.168.100.181',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//     async (config) => {
//         try {
//             const noAuthRoutes = ['/auth/login', '/auth/register'];

//             if (!noAuthRoutes.includes(config.url)) {
//                 const token = await AsyncStorage.getItem('token');
//                 if (token) {
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//             }
//         } catch (error) {
//             console.log('Lỗi lấy token từ AsyncStorage:', error);
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response && response.status === 403) {
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const res = await axios.post('http://192.168.100.181/auth/token', {
            refreshToken: refreshToken,
          });
          const newToken = res.data.token;
          await AsyncStorage.setItem('token', newToken);
          handleLoginWithNewToken(newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(error.config);
        } else {
          console.log('Refresh token hết hạn');
          await handleLogout();
        }
      } catch (refreshError) {
        console.log('Lỗi làm mới token:', refreshError);
        await handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refreshToken');

  const { setUser, setToken } = useContext(AuthContext);
  setUser(null);
  setToken('notoken');
};

const handleLoginWithNewToken = async (token) => {
    const { setToken } = useContext(AuthContext);
    setToken(token);
  };

export default apiClient;
