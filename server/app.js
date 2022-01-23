const express = require('express');
const http = require('http');

const serverPort = process.env.REACT_APP_BACKEND_PORT || 4000;
const system = require('./routes/system');

const app = express();
app.use(express.json());
app.use('/api/system', system);
app.use('/api/health', (req, res) => res.send('Ok'));

const server = http.createServer(app);

const io = require('socket.io')(server);

let nextClientId = 0;

io.on('connection', (socket) => {
  let clientId = ++nextClientId;
  console.info(`[INFO] Client #${clientId} connected`);

  socket.on('disconnect', () => {
    console.info(`[INFO] Client #${clientId} disconnected`);
  });
});

server.listen(serverPort, () =>
  console.info(`[INFO] fenice2.0 server listening on port ${serverPort}`),
);
