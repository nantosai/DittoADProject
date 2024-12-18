import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://eu-central-1.hapio.net/v1/',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HAPIO_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default apiClient;