import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://localhost:8000';

export const fetchCampaigns = () => {
  return axios.get(`${API_URL}/api/campaigns`);
};

export const fetchCampaign = (id) => {
  return axios.get(`${API_URL}/api/campaigns/${id}`);
};

export const postVolunteer = (id, volunteer) => {
  return axios.post(
    `${API_URL}/api/campaigns/${id}/volunteers`, 
    qs.stringify(volunteer), {
      headers: {
        'Content-TYpe': 'application/x-www-form-urlencoded'
      }
    }
  );
};