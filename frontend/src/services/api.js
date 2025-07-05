import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Log API functions
export const logAPI = {
  // Get all logs with optional filters
  getLogs: (params = {}) => 
    API.get('/logs', { params }).then(res => res.data.data),

  // Create a new log entry
  createLog: (logEntry) => 
    API.post('/logs', logEntry).then(res => res.data.data),

  // Get log levels
  getLogLevels: () => 
    API.get('/logs/levels').then(res => res.data.data),

  // Get log statistics
  getLogStats: () => 
    API.get('/logs/stats').then(res => res.data.data),

  // Search logs by message
  searchLogs: (query) => 
    API.get('/logs/search', { params: { q: query } }).then(res => res.data.data),

  // Get logs by level
  getLogsByLevel: (level) => 
    API.get(`/logs/level/${level}`).then(res => res.data.data),

  // Get logs by resource ID
  getLogsByResource: (resourceId) => 
    API.get(`/logs/resource/${resourceId}`).then(res => res.data.data)
};

// System API functions
export const systemAPI = {
  // Health check
  getHealth: () => 
    axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/health`).then(res => res.data),

  // Get API info
  getAPIInfo: () => 
    axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/`).then(res => res.data)
};

// Legacy functions for backward compatibility
export const fetchLogs = logAPI.getLogs;
export const postLog = logAPI.createLog;