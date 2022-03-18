import { Button, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../SocketContext';
import MasterView from '../components/tracker/MasterView';
import PlayerView from '../components/tracker/PlayerView';
import { useSelector } from 'react-redux';
import { Box, Toolbar } from '@mui/material';

const Tracker = () => {
  const [clientId, setClientId] = useState(null);
  const [currPlayer, setCurrPlayer] = useState(null);
  const isMaster = useSelector((st) => st.userReducer.dm);
  const socket = useContext(SocketContext);

  const disconnect = useCallback(() => {
    if (isMaster) {
      socket.emit('unsetMaster');
    }
    setClientId(null);
    setCurrPlayer(null);
  }, [socket, isMaster]);

  useEffect(() => {
    socket.on('registeredPlayer', (data) => {
      setClientId(data.id);
    });

    socket.on('kick', () => {
      disconnect();
    });

    socket.on('error', (err) => {
      console.error(err);
      alert('Error! ' + err);
    });

    socket.on('updateTurns', (newCurrent) => {
      setCurrPlayer(newCurrent);
    });
  }, [socket, disconnect]);

  const register = () => {
    socket.emit(isMaster ? 'registerMaster' : 'registerPlayer');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <p id="status">
        {clientId === null
          ? 'Disconnected'
          : 'Connected - client #' + clientId + (isMaster ? ' (master)' : '')}
      </p>
      {clientId === null ? (
        // Initial menu
        <Button variant="contained" onClick={register}>
          Register
        </Button>
      ) : (
        <>
          {isMaster ? (
            <MasterView currPlayer={currPlayer} />
          ) : (
            <PlayerView currPlayer={currPlayer} clientId={clientId} />
          )}
          <Typography style={{ marginTop: '20px' }}>
            <Button variant="contained" onClick={disconnect}>
              Disconnect
            </Button>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Tracker;
