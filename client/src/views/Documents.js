import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Documents = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        Documents
      </Typography>
      <Typography paragraph>Collection of manuals and character sheets</Typography>
      <Typography paragraph>Coming soon!</Typography>
    </Box>
  );
};

export default Documents;
