import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Alignment = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <iframe
        title="alignment"
        style={{ width: '100%', height: 'calc(100vh - 120px)', border: 'none' }}
        src="https://alignment.lafenice.soulsbros.ch"
      />
    </Box>
  );
};

export default Alignment;
