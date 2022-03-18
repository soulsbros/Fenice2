import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../../SocketContext';
import Form from './Form';
import StatusViewer from './StatusViewer';

const PlayerView = ({ currPlayer, clientId }) => {
  const socket = useContext(SocketContext);
  const [formData, setFormData] = useState(null);
  const [registered, setRegistered] = useState(false);

  const registerInitiative = () => {
    localStorage['playerData'] = JSON.stringify(formData);
    let newFormData = formData;
    newFormData.id = clientId;
    setFormData(newFormData);
    socket.emit('registerInitiative', [formData]);
    setRegistered(true);
  };

  const nextPlayer = () => {
    socket.emit('endTurn');
  };

  return (
    <>
      {currPlayer !== null ? (
        // Playing
        <>
          <StatusViewer currPlayer={currPlayer} isMaster={false} />
          {clientId === currPlayer.id ? (
            <Button variant="contained" color="primary" onClick={nextPlayer}>
              End turn
            </Button>
          ) : null}
        </>
      ) : registered ? (
        <p>Successfully registered! Wait for the master to start the game.</p>
      ) : (
        // Not playing
        <>
          <p style={{ marginBottom: '50px' }}>Not playing - fill in your data to get in!</p>
          <Form style={{ marginBottom: '500px' }} handleFormData={setFormData} />
          <Button
            style={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
            onClick={registerInitiative}
          >
            Submit
          </Button>
          &nbsp;
        </>
      )}
    </>
  );
};

export default PlayerView;
