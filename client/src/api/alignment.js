import axios from 'axios';
export const getAllCharacters = () => axios.get(`api/alignment/getAllCharacters`);

export const getCharactersByCampaign = (campaign) =>
  axios.get(`api/alignment/getCharactersByCampaign/${campaign}`);

export const addAction = (action) => axios.post(`api/alignment/addAction`, action);

export const getCampaigns = () => axios.get('api/alignment/getCampaigns');

export const getCampaign = (id) => axios.get(`api/alignment/getCampaignById/${id}`);
