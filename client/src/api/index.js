import axios from 'axios';

export const validateCookie = (username, token) =>
  axios.post(`api/auth/validateCookie`, { username, token });

export const getAllCampaigns = () => axios.get('api/alignment/getCampaigns');

export const getCharactersByCampaignName = (id) => {
  if (id !== null) {
    return axios.get(`api/alignment/getCharactersByCampaignName/${id}`);
  } else {
    return [];
  }
};
