import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaigns } from '../api';

const CampaignSelector = () => {
  const dispatch = useDispatch();
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const handleCampaignChange = (event) => {
    dispatch({
      type: 'SET_CAMPAIGN',
      payload: event.target.innerText,
    });
  };

  useEffect(() => {
    let mapCampaigns = async () => {
      let result = await getAllCampaigns();
      setCampaignOptions(result.data.map((el) => el.name));
    };
    mapCampaigns();
  }, []);

  return (
    <Autocomplete
      value={campaign}
      disablePortal
      options={campaignOptions}
      onChange={handleCampaignChange}
      sx={{ width: 300, display: 'inline-block' }}
      renderInput={(params) => <TextField {...params} color="secondary" label="Campaign" />}
    />
  );
};

export default CampaignSelector;
