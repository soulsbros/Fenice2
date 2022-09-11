import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../SocketContext';
import Form from './Form';
import StatusViewer from './StatusViewer';

const PlayerView = () => {
  const socket = useContext(SocketContext);
  const playerData = useSelector((st) => st.trackerReducer.playerData);
  const currPlayer = useSelector((st) => st.trackerReducer.currPlayer);
  const clientId = useSelector((st) => st.trackerReducer.clientId);

  const nextPlayer = () => {
    socket.emit('endTurn');
  };

  return (
    <>
      {currPlayer !== null ? (
        // Playing
        <>
          <StatusViewer />
          {clientId === currPlayer.id ? (
            <Button variant="contained" onClick={nextPlayer}>
              End turn
            </Button>
          ) : null}
        </>
      ) : playerData?.hp ? (
        <p>Successfully registered! Wait for the master to start the game.</p>
      ) : (
        // Not playing
        <>
          <p sx={{ mb: '50px' }}>Not playing - fill in your data to get in!</p>
          <Form sx={{ mb: '500px' }} />
        </>
      )}
    </>
  );
};

export default PlayerView;
