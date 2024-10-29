import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  async (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      console.log(config.headers);
      return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance
