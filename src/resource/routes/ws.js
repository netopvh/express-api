const io = require('../../lib/Socket');

function WsController(params) {
  console.log('WsController', params);
}

function WsMiddleware(socket, next) {
  console.log('Middleware', socket);
  next();
}

io.of('/chat')
  .on('connection', socket => {
    // socket.use(WsMiddleware)
    socket.on('test', WsController);
    socket.on('test1', WsController);
  })
  .use(WsMiddleware);

io.on('connection', socket => {
  console.log(`Client connected [id=${socket.id}]`);
  socket.on('disconnect', () => console.log(`Client gone [id=${socket.id}]`));
});

module.exports = io;
