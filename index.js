/**
 * @file name: index.js
 * @project: Entry log collector
 * @author: Changwook Jung(jadhvank@gmail.com)
 * @feature: on top of all the code files
 *           execute server for
 *           execute client for
 *           send socketio.js to server
 */

//for log timestamp
require('console-stamp')(console, '[HH:MM:ss.l]');

var server = require('./server');
var socketio = require('./socketio');
var client = require('./clientEntry');

server.start(socketio.socketio);
client.start();