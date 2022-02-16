import { AppBar, CssBaseline, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import Alignment from './components/Alignment';
import Documents from './components/Documents';
import Tracker from './components/Tracker';
import theme from './Theme';
import { validateCookie } from './api';
import { AccountCircle } from '@mui/icons-material';
import Profile from './components/Profile';
import Skills from './components/Skills';

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((st) => st.generalReducer.page);
  const username = useSelector((st) => st.generalReducer.username);
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
      case 'profile':
        return <Profile />;
      case 'skills':
        return <Skills />;
      default:
        return <Home />;
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch({
      type: 'SET_PAGE',
      payload: 'profile',
    });
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    location.href =
      'https://login.soulsbros.ch/?p=closeSession&location=https://v2.lafenice.soulsbros.ch';
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
        const username = cookie.split('%3A')[0];
        const token = cookie.split('%3A')[1];
        const result = await validateCookie(username, token);
        if (result.data.valid) {
          dispatch({
            type: 'SET_LOGIN_DATA',
            payload: { username: result.data.username, dm: result.data.dm },
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
        <AppBar position="fixed" sx={{ zIndex: (th) => th.zIndex.drawer + 1 }} color="primary">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <img alt="favicon" src="img/favicon-32x32.png" />
            <Typography ml={2} variant="h6" noWrap component="div">
              La Compagnia della Fenice
            </Typography>
            {username ? (
              <div>
                {username}
                <IconButton size="large" onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>
              </div>
            ) : (
              <div></div>
            )}
          </Toolbar>
        </AppBar>

        <Sidebar />

        {renderBody()}
      </Box>
    </ThemeProvider>
  );
};

export default App;
