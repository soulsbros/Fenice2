import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Tracker = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        Combat tracker
      </Typography>
      <Typography paragraph>An interactive combat tracker</Typography>
      <Typography paragraph>Coming soon!</Typography>
    </Box>
  );
};

export default Tracker;
