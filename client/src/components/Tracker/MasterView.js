import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { SocketContext } from '../../SocketContext';
import StatusViewer from './StatusViewer';
import { useSelector } from 'react-redux';

const MasterView = () => {
  const socket = useContext(SocketContext);
  const currPlayer = useSelector((st) => st.trackerReducer.currPlayer);

  const nextPlayer = () => {
    socket.emit('endTurn');
  };

  const start = () => {
    socket.emit('start');
  };

  const disconnectAll = () => {
    socket.emit('kickAll');
  };

  return (
    <>
      {currPlayer === null ? (
        // Not playing - form to insert data
        // TODO multiple forms
        <>
          <Button variant="contained" onClick={start}>
            Start
          </Button>
        </>
      ) : (
        // Playing - status and controls
        <>
          <StatusViewer isMaster={true} />
          <Button variant="outlined" onClick={disconnectAll}>
            Kick all
          </Button>
          <Button variant="outlined" onClick={start}>
            Restart
          </Button>
          <Button variant="contained" onClick={nextPlayer}>
            Next player
          </Button>
        </>
      )}
    </>
  );
};

export default MasterView;
