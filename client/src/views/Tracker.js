import { Button, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MasterView from '../components/Tracker/MasterView';
import PlayerView from '../components/Tracker/PlayerView';
import { SocketContext } from '../SocketContext';

const Tracker = () => {
  const dispatch = useDispatch();
  const clientId = useSelector((st) => st.trackerReducer.clientId);
  const isMaster = useSelector((st) => st.userReducer.dm);
  const socket = useContext(SocketContext);

  const disconnect = useCallback(() => {
    if (isMaster) {
      socket.emit('unsetMaster');
    }
    dispatch({
      type: 'RESET_IDS',
    });
  }, [socket, isMaster, dispatch]);

  useEffect(() => {
    socket.on('registeredPlayer', (data) => {
      dispatch({
        type: 'SET_CLIENT_ID',
        payload: data.id,
      });
    });

    socket.on('kick', () => {
      disconnect();
    });

    socket.on('error', (err) => {
      console.error(err);
      alert('Error! ' + err);
    });

    socket.on('updateTurns', (newCurrent) => {
      dispatch({
        type: 'SET_CURRENT_PLAYER',
        payload: newCurrent,
      });
    });
  }, [socket, disconnect, dispatch]);

  const register = () => {
    socket.emit(isMaster ? 'registerMaster' : 'registerPlayer');
  };

  return (
    <>
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
          {isMaster ? <MasterView /> : <PlayerView />}
          <Typography sx={{ mt: '20px' }}>
            <Button variant="contained" onClick={disconnect}>
              Disconnect
            </Button>
          </Typography>
        </>
      )}
    </>
  );
};

export default Tracker;
