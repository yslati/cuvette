import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://cuvetter-api.vercel.app',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  async (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance
