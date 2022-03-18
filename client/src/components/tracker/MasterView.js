import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { SocketContext } from '../../SocketContext';
import StatusViewer from './StatusViewer';

const MasterView = ({ currPlayer }) => {
  const socket = useContext(SocketContext);

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
          <Button variant="contained" color="primary" onClick={start}>
            Start
          </Button>
          &nbsp;
        </>
      ) : (
        // Playing - status and controls
        <>
          <StatusViewer currPlayer={currPlayer} isMaster={true} />
          <Button variant="contained" onClick={disconnectAll}>
            Kick all
          </Button>
          &nbsp;
          <Button variant="contained" onClick={start}>
            Restart
          </Button>
          &nbsp;
          <Button variant="contained" color="primary" onClick={nextPlayer}>
            Next player
          </Button>
          &nbsp;
        </>
      )}
    </>
  );
};

export default MasterView;
