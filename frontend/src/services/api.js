import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // CRITICAL: This enables sending/receiving cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Remove the request interceptor that adds Authorization header
// We don't need it anymore because cookies are sent automatically

// Response interceptor for handling 401 errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retrying, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('auth');
        const path = window.location.pathname;
        const publicPaths = ['/', '/login', '/register', '/forgot-password'];
        const isPublic = publicPaths.includes(path) || path.startsWith('/reset-password/');
        if (!isPublic) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
      const path = window.location.pathname;
      const publicPaths = ['/', '/login', '/register', '/forgot-password'];
      const isPublic = publicPaths.includes(path) || path.startsWith('/reset-password/');
      if (!isPublic) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;