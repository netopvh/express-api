const io = require('../../lib/Socket');

function WsController(params, socket) {
  socket.emit('testChat', { msg: `msg bola` });
}

io.of('/test').on('connection', socket => {
  socket.on('testChat', params => WsController(params, socket));
});

module.exports = io;
