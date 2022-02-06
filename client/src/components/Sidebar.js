import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import Home from '@mui/icons-material/Home';
import { AllInclusive, ArrowBack, Timer, Topic } from '@mui/icons-material/';

const drawerWidth = 240;

const Sidebar = () => {
  const dispatch = useDispatch();
  const setPage = (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page,
    });
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
      <Box sx={{ overflow: 'auto' }}>
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
          <ListItem button onClick={() => setPage('documents')}>
            <ListItemIcon>
              <Topic />
            </ListItemIcon>
            <ListItemText primary="Documents" />
          </ListItem>
          <ListItem button onClick={() => setPage('alignment')}>
            <ListItemIcon>
              <AllInclusive />
            </ListItemIcon>
            <ListItemText primary="Alignment" />
          </ListItem>
          <ListItem button onClick={() => setPage('combattracker')}>
            <ListItemIcon>
              <Timer />
            </ListItemIcon>
            <ListItemText primary="Combat tracker" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
