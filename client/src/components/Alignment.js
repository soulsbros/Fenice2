import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Alignment = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        Alignment
      </Typography>
      <Typography paragraph>
        A tool to track our alignment changes (hopefully not too many!)
      </Typography>
      <Typography paragraph>Coming soon!</Typography>
    </Box>
  );
};

export default Alignment;
