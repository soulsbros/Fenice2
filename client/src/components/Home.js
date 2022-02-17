import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const username = useSelector((st) => st.generalReducer.username);
  const printWelcomeText = () => (username ? `Welcome back, ${username}!` : 'Welcome!');
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <img src="img/sfondoHeader.jpg" alt="logo" style={{ maxWidth: '100%' }} />
      <Typography variant="h6" mb={2} mt={2}>
        {printWelcomeText()}
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt.
        Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
        mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
        odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
        Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus
        vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
      </Typography>
    </Box>
  );
};

export default Home;
