import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://arabfilmsserver.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor for adding token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// interceptor for handling responses
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle authentication errors only for protected routes
  if (error.response?.status === 401) {
    // Only redirect to login if we're on a protected route
    const currentPath = window.location.pathname;
    const protectedRoutes = ['/Profile', '/dashboard', '/AdminDashboard', '/AddForm'];
    
    if (protectedRoutes.some(route => currentPath.startsWith(route))) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});

export { axiosInstance };
