import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '@mui/icons-material/Home';
import { AllInclusive, ArrowBack, Casino, Login, Person, Timer } from '@mui/icons-material/';

const drawerWidth = 240;

const Sidebar = () => {
  const username = useSelector((st) => st.userReducer.username);
  const dispatch = useDispatch();

  const setPage = (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page,
    });
  };

  const doLogin = () => {
    window.location.href =
      'https://login.soulsbros.ch?p=login&location=https://fenice2.soulsbros.ch';
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <List>
          <ListItem button onClick={() => (window.location.href = 'https://lafenice.soulsbros.ch')}>
            <ListItemIcon>
              <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="Back to old site" />
          </ListItem>
          <ListItem button onClick={() => setPage('home')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {username ? (
            <>
              <ListItem button onClick={() => setPage('alignment')}>
                <ListItemIcon>
                  <AllInclusive />
                </ListItemIcon>
                <ListItemText primary="Alignment" />
              </ListItem>
              <ListItem button onClick={() => setPage('characters')}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Characters" />
              </ListItem>
              <ListItem button onClick={() => setPage('combattracker')}>
                <ListItemIcon>
                  <Timer />
                </ListItemIcon>
                <ListItemText primary="Combat tracker" />
              </ListItem>
              {/* <ListItem button onClick={() => setPage('documents')}>
                <ListItemIcon>
                  <Topic />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItem> */}
              <ListItem button onClick={() => setPage('skills')}>
                <ListItemIcon>
                  <Casino />
                </ListItemIcon>
                <ListItemText primary="Skill checks" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={doLogin}>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
        <Box sx={{ padding: '20px' }}>
          &copy;2022 Soulsbros
          <a
            href="https://github.com/soulsbros"
            target="_blank"
            style={{ verticalAlign: 'middle', marginLeft: '4px' }}
            rel="noreferrer"
          >
            <img src="https://soulsbros.ch/img/icon_github.png" width="32px" alt="GitHub logo" />
          </a>
          <a
            href="https://soulsbros.ch/?p=contact"
            target="_blank"
            style={{ verticalAlign: 'middle', marginLeft: '4px' }}
            rel="noreferrer"
          >
            <img src="https://soulsbros.ch/img/icon_contact.png" width="32px" alt="Contact logo" />
          </a>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
