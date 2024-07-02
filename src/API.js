import axios from 'axios';
import { environment } from "./enviroments/EnvDev";

const API_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials) => {
  const response = await api.post(`${API_URL}/api/v1/auth/login`, credentials);
  return response.data;
};

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // Token is expired or invalid
//       localStorage.removeItem('token');
//       window.location.href = '/login'; 
//     }
//     return Promise.reject(error);
//   }
// );

export const getAllMembers = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get(`${API_URL}/api/v1/user/locations`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;

  // const membersWithLocation = await Promise.all(response.data.data.map(async (member) => {
  //   try {
  //     const geoResponse = await environment.reverseGeocode({
  //       query: [member.longitude, member.latitude],
  //       types: ['place']
  //     }).send();

  //     const features = geoResponse.body.features;
  //     const location = features.length > 0 ? features[0].place_name : 'Location unavailable';
  //     return { ...member, location };
  //   } catch (error) {
  //     console.error("Error getting location:", error);
  //     return { ...member, location: "Location unavailable" };
  //   }
  // }));

  // return membersWithLocation;
};