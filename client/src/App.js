import { CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { validateCookie } from './api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { SocketContext } from './SocketContext';
import theme from './Theme';
import Alignment from './views/Alignment';
import Characters from './views/Characters';
import Home from './views/Home';
import Map from './views/Map';
import Profile from './views/Profile';
import Skills from './views/Skills';
import Tracker from './views/Tracker';

const isProd = process.env.REACT_APP_PROD || false;

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((st) => st.generalReducer.page);

  const renderBody = () => {
    switch (page) {
      case 'alignment':
        return <Alignment />;
      case 'characters':
        return <Characters />;
      case 'combattracker':
        return <Tracker />;
      case 'map':
        return <Map />;
      case 'profile':
        return <Profile />;
      case 'skills':
        return <Skills />;
      case 'home':
      default:
        return <Home />;
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const [socket, setSocket] = useState(null);

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
    // Setup socket connection
    console.info('Connecting to ' + (isProd ? 'prod' : 'dev'));
    const newSocket = isProd
      ? io.connect({ path: '/socket.io' })
      : io.connect(`http://${location.hostname}:4000`, {
          path: '/socket.io',
        });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [dispatch, setSocket]);

  return (
    <ThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <TopBar />

          <Sidebar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {renderBody()}
          </Box>
        </Box>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default App;
