import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Tracker = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <iframe
        title="tracker"
        style={{ width: '100%', height: 'calc(100vh - 120px)', border: 'none' }}
        src="https://tracker.soulsbros.ch"
      />
    </Box>
  );
};

export default Tracker;
