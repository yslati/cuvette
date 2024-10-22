import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
})

// axiosInstance.interceptors.request.use(
//   (config) => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );

export default axiosInstance
