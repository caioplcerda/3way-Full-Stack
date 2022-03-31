import axios from 'axios';
import authService from './services/auth.service';

const http = axios.create({
  baseURL: 'http://localhost:3001',
});

http.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
