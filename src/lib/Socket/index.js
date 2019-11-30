const app = require('express')();
const server = require('http').Server(app);
const socket = require('socket.io');

module.exports = socket(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});
