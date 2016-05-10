var url = 'http://play04.play-entry.com:7000';
//var url = 'http://localhost:7777'
var socketEntry = require('socket.io-client')(url);
var fMgr = require('./fileMgr');
var dbMgr = require('./dbMgr');
var path = require("path");

function start() {
    'use strict';
    console.log('[%s]   entry log client starts', path.basename(__filename));
    var db = 'entry_test';
    var collection = 'raw_log';
    socketEntry.on('connect', function () {
        console.log('[%s]   entry socket connected', path.basename(__filename));
    });
    socketEntry.on('activity log', function (data) {
        console.log('[%s]   entry socket is receiving log', path.basename(__filename));
        console.log(data);

        fMgr.saveJson(data);
        dbMgr.insert(data, db, collection);
    });
    socketEntry.on('diconnect', function () {
        console.log('[%s]   entry socket disconnected', path.basename(__filename));
    });
}

function socketbridge(data) {
    'use strict';
    return data;
}

exports.start = start;