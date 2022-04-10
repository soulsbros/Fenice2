const express = require('express');
const http = require('http');
const cors = require('cors');

const serverPort = process.env.REACT_APP_BACKEND_PORT || 4000;
const auth = require('./routes/auth');
const alignment = require('./routes/alignment');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/alignment', alignment);
app.use('/api/health', (req, res) => res.send('Ok fenice2'));

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

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
