const app = require('./app');

app.server.listen(process.env.PORT || 3333);

app.socket.listen(8080);
