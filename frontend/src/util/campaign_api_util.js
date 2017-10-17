import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchCampaigns = () => {
  return axios.get(`${API_URL}/api/campaigns`);
};