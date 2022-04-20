import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaigns } from '../api';

const CampaignSelector = ({ sx }) => {
  const dispatch = useDispatch();
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const handleCampaignChange = (event, value) => {
    dispatch({
      type: 'SET_CAMPAIGN',
      payload: value,
    });
  };

  useEffect(() => {
    let mapCampaigns = async () => {
      let result = await getAllCampaigns();
      setCampaignOptions(
        result.data.map((el) => ({
          id: el._id,
          label: el.name,
        })),
      );
    };
    mapCampaigns();
  }, []);

  return (
    <Autocomplete
      disablePortal
      value={campaign?.label || null}
      isOptionEqualToValue={(option, value) => option.label === value}
      options={campaignOptions}
      onChange={handleCampaignChange}
      sx={{ width: 300, display: 'inline-block', ...sx }}
      renderInput={(params) => <TextField {...params} color="secondary" label="Campaign" />}
    />
  );
};

export default CampaignSelector;
