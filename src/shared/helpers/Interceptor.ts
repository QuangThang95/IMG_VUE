import axios from 'axios';
import store from '@/store';
import AppConfig from "@/constants/AppConfig";
import ErrorHandler from './ErrorHandler';

axios.defaults.timeout = AppConfig.TIMEOUT_CALL_API;

// Add a request interceptor
axios.interceptors.request.use(
  (request) => {
    const isAuthenticated = store.getters['authModule/isAuthenticated'];
    if (isAuthenticated) {
      const token = store.getters['authModule/token'];
      // fix clear cache for IE
      request.headers["cache-control"] = 'no-store, no-cache, must-revalidate';
      request.headers["Cache-Control"] = 'no-store, no-cache, must-revalidate';
      request.headers["Pragma"] = 'no-cache';
      request.headers.Pragma = 'no-cache';
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  (error) => {
    return ErrorHandler(error);
  },
);



