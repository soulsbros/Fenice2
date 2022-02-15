import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Profile = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        Profile
      </Typography>
      <Typography paragraph>Section to manage your profile and settings</Typography>
      <Typography paragraph>Coming soon!</Typography>
    </Box>
  );
};

export default Profile;
