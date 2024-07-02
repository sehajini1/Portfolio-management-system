import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
  return response.data;
};