import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getServerStatus = async () => {
  try {
    const response = await api.get('/server/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching server status:', error);
    throw error;
  }
};

export const restartServer = async () => {
  try {
    const response = await api.post('/server/restart');
    return response.data;
  } catch (error) {
    console.error('Error restarting server:', error);
    throw error;
  }
};

export default api;