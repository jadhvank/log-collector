var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
var url_base = 'mongodb://localhost:27017/';

function insert(data, database, collection) {
    'use strict';
    var url = url_base + database;

    var insertDocument = function (db, callback) {
        db.collection(collection).insertOne(data, function (err, result) {
            assert.equal(err, null);
            console.log("Insert a document into " + database + "." + collection);
            callback(result);
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocument(db, function () {
            db.close();
        });
    });
}

function logEmule(socket, database, collection, requestedLecture) {
    'use strict';
    console.log("log simul connected");
    var url = url_base + database;
    var cnt = 0;

    var findAll = function (db, callback) {
        var cursor = db.collection(collection).find({'stages.actions.data.key': "code"});

        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc !== null) {
                try {
                    doc.stages.forEach(function (stages) {
                        stages.actions.forEach(function (actions) {
                            actions.data.forEach(function (data) {
                                if (stages.stageId == requestedLecture) {
                                // if (cnt < 500) {
                                    if (data.key === "code" || data.key === "script") {
                                        var activityLog = JSON.parse("{}");
                                        activityLog._id = doc._id;
                                        activityLog.course = stages.stageId;
                                        activityLog.lecture = stages.stageId;
                                        // activityLog.serverTS = Date.now();
                                        // activityLog.counter = cnt;
                                        activityLog.timestamp = actions.timestamp;
                                        activityLog.action = actions.name;
                                        // activityLog.code = JSON.stringify(data.value);
                                        activityLog.code = data.value;
                                        console.log(activityLog);
                                        socket.emit('emule_log', activityLog);
                                    }
                                }
                                cnt = cnt + 1;
                            });
                        });
                    });
                } catch (e) {
                    if (e === null) {
                        console.log("error is null");
                    }
                }
            } else {
                callback();
            }
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        findAll(db, function () {
            db.close();
        });
    });
}

exports.insert = insert;
exports.logEmule = logEmule;