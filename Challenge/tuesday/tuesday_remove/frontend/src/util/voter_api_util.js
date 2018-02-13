import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchVoters = () => {
  return axios.get(`${API_URL}/api/voters`);
};