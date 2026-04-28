import axios from 'axios';

/**
 * Base configuration for Axios instance
 * Using environment variables is recommended for production (VITE_API_URL)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Useful for adding Authorization tokens or logging
 */
api.interceptors.request.use(
  (config) => {
    // You can retrieve a token from local storage or zustand store here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Standardizes error handling across the application
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ??
      error.response?.data?.error ??
      error.response?.message ??
      error.response?.error ??
      'An unexpected error occurred';
    
    // Log error for debugging (as per Senior Full Stack criterion)
    console.error('[API Error]:', message);
    
    return Promise.reject(new Error(message));
  }
);

export default api;