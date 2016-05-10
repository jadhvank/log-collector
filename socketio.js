var path = require("path");
var dbMgr = require('./dbMgr.js');

function socketio(socket) {
    'use strict';
    // dbMgr.logEmule(socket, "entry_3", "activities"); // for test
    socket.on('my other event', function (data) {
        console.log('[%s]      ', path.basename(__filename), data.my);
        console.log('[%s]      my other event data called', path.basename(__filename));
    });
    socket.on("message", function (msg) { // msg === data
        console.info("[%s]         message: ", path.basename(__filename), msg);
    });
    socket.on("disconnect", function () {
        console.info("[%s]      disconnected...", path.basename(__filename));
    });
    socket.on('activity_log', function () {
        console.info('[%s]      activity log requested', path.basename(__filename));
        socket.emit('activity log', {date: '20160302'});
    });
    socket.on('emule_log_req', function (data) {
        console.info('[%s]      activity log requested', path.basename(__filename), data.course, data.lecture);
        // socket.emit('activity log', {date: '20160302'});
        var reqLec = data.course + "-" + data.lecture;
        dbMgr.logEmule(socket, "entry_3", "activities", reqLec);
    });
    socket.on('edito_projectResult', function () {
        console.info('[%s]      edito_projectResult input', path.basename(__filename));
    });
}

exports.socketio = socketio;