#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app.ts');
var debug = require('debug')('lab03orm:server');
var http = require('http');
var cors = require('cors');

/**
 * Get port from environment and store in Express.
 */

var port = normalPort(process.env.PORT || '3000');
app.set('port', port);
app.use(
  cors({
    exposedHeaders: ['App-Commit-Hash'],
    credentials: true,
    origin: [
      'http://localhost:3000',
    ],
  }),
);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log('Running'));
server.on('error', onErr);
server.on('listening', onListen);

/**
 * Normalize a port into a number, string, or false.
 */

function normalPort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onErr(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListen() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
