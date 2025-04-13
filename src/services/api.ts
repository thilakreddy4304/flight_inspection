import axios from 'axios';

// Define the base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific errors (e.g., 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      localStorage.removeItem('auth_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
const ApiService = {
  // Example flight-related API calls
  flights: {
    getAll: () => apiClient.get('/flights'),
    getById: (id: string) => apiClient.get(`/flights/${id}`),
    create: (data: any) => apiClient.post('/flights', data),
    update: (id: string, data: any) => apiClient.put(`/flights/${id}`, data),
    delete: (id: string) => apiClient.delete(`/flights/${id}`),
  },
  
  // Add more API endpoints as needed
  // Example: inspections, users, auth, etc.
};

export default ApiService; 