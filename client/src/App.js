import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateCookie } from './api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import theme from './Theme';
import Alignment from './views/Alignment';
import Characters from './views/Characters';
import Documents from './views/Documents';
import Home from './views/Home';
import Profile from './views/Profile';
import Skills from './views/Skills';
import Tracker from './views/Tracker';

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((st) => st.generalReducer.page);

  const renderBody = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'alignment':
        return <Alignment />;
      case 'characters':
        return <Characters />;
      case 'combattracker':
        return <Tracker />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      case 'skills':
        return <Skills />;
      default:
        return <Home />;
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    // on load, check cookie
    const checkLogin = async () => {
      const cookie = getCookie('remembermeSoulsbros');
      if (cookie) {
        const user = cookie.split('%3A')[0];
        const token = cookie.split('%3A')[1];
        const result = await validateCookie(user, token);
        if (result.data.valid) {
          dispatch({
            type: 'SET_LOGIN_DATA',
            payload: {
              username: result.data.username,
              dm: result.data.dm,
              admin: result.data.admin,
            },
          });
        } else {
          // unset borked cookie
          document.cookie = 'remembermeSoulsbros=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }
    };
    checkLogin();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TopBar />

        <Sidebar />

        {renderBody()}
      </Box>
    </ThemeProvider>
  );
};

export default App;
