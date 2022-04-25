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
let currentPlayerIndex = 0;
let players = [];
let masterId = 0;

io.on('connection', (socket) => {
  let clientId = ++nextClientId;
  console.info(`[INFO] Client #${clientId} connected`);
  socket.emit('kick'); //refresh state on client

  socket.on('registerPlayer', () => {
    socket.emit('registeredPlayer', { id: clientId, master: false });
  });

  socket.on('registerMaster', () => {
    console.info(`[INFO] Registering master, id ${clientId}`);
    if (masterId === 0) {
      masterId = clientId;
      socket.emit('registeredPlayer', { id: clientId, master: true });
    } else {
      console.error(`[ERROR] Trying to register more than one master! Offender: ${clientId}`);
      socket.emit('error', 'A master is already registered');
    }
  });

  // Gets an array of player objects
  socket.on('registerInitiative', (data) => {
    data.forEach((player) => {
      console.info(player);
      players.push(player);
    });
  });

  socket.on('endTurn', () => {
    if (currentPlayerIndex + 1 < players.length) {
      ++currentPlayerIndex;
    } else {
      currentPlayerIndex = 0;
    }
    console.info(`[INFO] Updating turns, new player: ${currentPlayerIndex}`);
    io.emit('updateTurns', players[currentPlayerIndex]);
  });

  socket.on('start', () => {
    console.info(`[INFO] Starting turns with ${players.length} players`);
    players.sort((a, b) => b.initiative - a.initiative);
    currentPlayerIndex = 0;
    io.emit('updateTurns', players[currentPlayerIndex]);
  });

  socket.on('kickAll', () => {
    console.info('[INFO] Kicking all players and resetting');
    socket.broadcast.emit('kick');
    players = [];
    currentPlayerIndex = 0;
    masterId = 0;
  });

  socket.on('disconnect', () => {
    console.info(`[INFO] Client #${clientId} disconnected`);
    if (clientId === masterId) {
      masterId = 0;
    }
  });

  socket.on('unsetMaster', () => {
    console.info(`[INFO] Unregistering master #${clientId}`);
    masterId = 0;
  });
});

server.listen(serverPort, () =>
  console.info(`[INFO] fenice2.0 server listening on port ${serverPort}`),
);
