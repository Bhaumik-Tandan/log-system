import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 10000
});

export const logAPI = {
  getLogs: (params = {}) => 
    API.get('/logs', { params }).then(res => res.data.data),

  createLog: (logEntry) => 
    API.post('/logs', logEntry).then(res => res.data.data),

  getLogLevels: () => 
    API.get('/logs/levels').then(res => res.data.data),

  getLogStats: () => 
    API.get('/logs/stats').then(res => res.data.data),

  searchLogs: (query) => 
    API.get('/logs/search', { params: { q: query } }).then(res => res.data.data),

  getLogsByLevel: (level) => 
    API.get(`/logs/level/${level}`).then(res => res.data.data),

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