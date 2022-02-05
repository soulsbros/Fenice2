import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import Body from './Body';
import Sidebar from './Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b90009',
    },
    secondary: {
      main: '#44403e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (th) => th.zIndex.drawer + 1 }} color="primary">
          <Toolbar>
            <img alt="favicon" src="img/favicon-32x32.png" />
            <Typography ml={2} variant="h6" noWrap component="div">
              La Compagnia della Fenice
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar />

        <Body />
      </Box>
    </ThemeProvider>
  );
};

export default App;
