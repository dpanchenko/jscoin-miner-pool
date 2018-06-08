const config = require('config');
const express = require('express');
const createHttpServer = require('http').createServer;
const socketIO = require('socket.io');
const createDebug = require('debug');

const log = createDebug(`${config.app.name}:service:log`);

let minersPool = [];

const app = express();

const server = createHttpServer(app);
const io = socketIO(server);

app.use((req, res) =>
  res.json(minersPool));

server.listen(config.server.port, () => {
  log(`${config.app.name} v${config.app.version} started`);
  log(`waiting connections on http://0.0.0.0:${config.server.port}`);
});

io.on('connection', (socket) => {
  socket.on('hello', (data) => {
    socket.minerId = data.id; // eslint-disable-line
    minersPool.push(data);
    socket.broadcast.emit('miners', minersPool);
  });
  socket.on('block', () => {
    socket.broadcast.emit('block', {
      miner: socket.minerId,
    });
  });
  socket.on('disconnect', () => {
    minersPool = minersPool.filter(({ id }) => id !== socket.minerId);
    socket.broadcast.emit('miners', minersPool);
  });
});
