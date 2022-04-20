import { Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCharactersByCampaignName } from '../api';
import CampaignSelector from '../components/CampaignSelector';

const Characters = () => {
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    let mapCampaigns = async () => {
      let result = campaign ? await getCharactersByCampaignName(campaign.label) : null;
      setCharacters(result?.data || []);
    };
    mapCampaigns();
  }, [campaign]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        Characters
      </Typography>
      <CampaignSelector sx={{ marginBottom: 4 }} />
      {characters.map((el) => (
        <Paper key={el._id} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography>{`${el.name} ${el.lastname} - ${el.actualAlignment}`}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Characters;
