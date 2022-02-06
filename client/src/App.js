import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import React from 'react';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import Alignment from './components/Alignment';
import Documents from './components/Documents';
import Tracker from './components/Tracker';
import theme from './Theme';

const App = () => {
  const page = useSelector((st) => st.generalReducer.page);
  const renderBody = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'alignment':
        return <Alignment />;
      case 'documents':
        return <Documents />;
      case 'combattracker':
        return <Tracker />;
      default:
        return <Home />;
    }
  };

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

        {renderBody()}
      </Box>
    </ThemeProvider>
  );
};

export default App;
