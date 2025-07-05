import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' });
export const fetchLogs = (params) => API.get('/logs', { params }).then(res => res.data);
export const postLog = (entry) => API.post('/logs', entry).then(res => res.data);