const http = require('http');
const { app } = require('./app');
const config = require('./config');

app.set('port', process.env.PORT || config.port);

const server = http.createServer(app);

server.listen(process.env.PORT || config.port);

module.exports = server;
