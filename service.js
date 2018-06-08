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
  log('New connection');
  socket.on('hello', (data) => {
    log('Receive hello event', data);
    socket.minerId = data.id; // eslint-disable-line
    minersPool.push(data);
    socket.emit('miners', minersPool);
    socket.broadcast.emit('miners', minersPool);
  });
  socket.on('block', ({ minerId }) => {
    log('Receive block event from', minerId);
    socket.broadcast.emit('block', {
      minerId,
    });
  });
  socket.on('disconnect', () => {
    log('Receive disconnect event from', socket.minerId);
    minersPool = minersPool.filter(({ id }) => id !== socket.minerId);
    socket.broadcast.emit('miners', minersPool);
  });
});
