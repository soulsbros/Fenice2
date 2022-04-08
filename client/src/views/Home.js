import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const username = useSelector((st) => st.userReducer.username);
  const printWelcomeText = () => (username ? `Welcome back, ${username}!` : 'Welcome!');
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" mb={2}>
        {printWelcomeText()}
      </Typography>
      <Typography paragraph mb={2}>
        This is the new site for our D&amp;D group. Feel free to start exploring by browsing the
        tabs on the left sidebar! More features to come ＼(＾O＾)／
      </Typography>
      <img src="img/headerCropped.jpg" alt="logo" style={{ maxWidth: '100%' }} />
    </Box>
  );
};

export default Home;
