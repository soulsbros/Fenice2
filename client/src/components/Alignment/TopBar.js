import { Typography } from '@mui/material';
import React from 'react';
import CampaignSelector from '../CampaignSelector';

const TopBar = () => {
  return (
    <>
      <Typography variant="h6" mb={2}>
        Alignment
      </Typography>
      <CampaignSelector sx={{ marginBottom: 4 }} />
    </>
  );
};

export default TopBar;
