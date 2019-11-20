const http = require('http');
const { app } = require('./app');
const config = require('./config');

app.set('port', config.port);

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

module.exports = server;
