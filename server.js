/**
 * @file name: server.js
 * @project: Entry log collector
 * @author: Changwook Jung(jadhvank@gmail.com)
 * @feature: create and run http server
 *           create socketio to send data to requester
 */
var path = require("path");
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('./router'); // ==> later, move to index


/**
 * @param  {[type]} socketio []
 * @return {[type]}
 */
function start(socketio) {
    'use strict';
    server.listen(8888); // port:8888
    console.log('[%s]        server starts', path.basename(__filename));

    app.use('/', router);
    /* when received connection request through socketio, handle event in socketio.js */
    io.sockets.on('connection', function (socket) {
        console.log('[%s]        socket.io connected...', path.basename(__filename));

        socketio(socket);
        socket.emit('news', {hello: 'world'}); // dummy for test
    });
}

exports.start = start;