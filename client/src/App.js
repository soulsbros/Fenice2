import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SocketContext from './SocketContext';

const isProd = process.env.REACT_APP_PROD;

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.info('Connecting to ' + (isProd ? 'prod' : 'dev'));
    const newSocket = isProd
      ? io.connect({ path: '/socket.io' })
      : io.connect(`http://${window.location.hostname}:4000`, {
          path: '/socket.io',
        });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
      <img className="inlb vaMid" alt="favicon" src="img/favicon-32x32.png" />
      <span className="title vaMid"> react-boilerplate</span>
      {socket ? (
        <SocketContext.Provider value={socket}>
          <div className="container">
            <Typography>Work in progress</Typography>
          </div>
        </SocketContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
