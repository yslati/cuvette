import axios from 'axios'
import { checkTokenExpiration } from '../features/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
})

// axiosInstance.interceptors.request.use(
//   async (config) => {
//       const { default: store } = await import('../app/store');
//       await store.dispatch(checkTokenExpiration());
//       const accessToken = localStorage.getItem('accessToken');
//       if (accessToken) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//       return config;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );

export default axiosInstance
