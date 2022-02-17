import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

const Alignment = () => {
  const { dm, admin } = useSelector((st) => st.generalReducer);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {dm || admin ? (
        <iframe
          title="alignment"
          style={{ width: '100%', height: 'calc(100vh - 120px)', border: 'none' }}
          src="https://alignment.lafenice.soulsbros.ch"
        />
      ) : (
        <Typography>DM use only (for now)</Typography>
      )}
    </Box>
  );
};

export default Alignment;
