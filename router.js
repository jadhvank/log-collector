var express = require('express');
var bodyParser = require('body-parser');
var dbMgr = require('./dbMgr.js');
var path = require("path");
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.use(function timelog(request, response, next) {
    'use strict';
    console.log('[%s]        Time: ', path.basename(__filename), Date.now());
    next();
});

router.get('/', function (request, response) {
    'use strict';
    console.log('[%s]        called / --> response: root page', path.basename(__filename));
    response.send('root');
});

router.get('/evaluation', function (request, response) {
    'use strict';
    console.log('[%s]        called /evaluation --> response: evaluation page', path.basename(__filename));
    response.send('evaluation page');
});

router.get('/index.html', function (request, response) {
    'use strict';
    console.log('[%s]        called /index.html --> response: index.html page', path.basename(__filename));
    response.sendFile(__dirname + '/index.html');
});


router.post('/evaluation', function (request, response) {
// router.post('/', function (request, response) {
    'use strict';
    console.log('[%s]        called POST to /evaluation', path.basename(__filename));
    console.dir(request.body);
    var db = 'entry_test';
    var collection = 'formative';
    dbMgr.insert(request.body, db, collection);
    response.send('POST SUCCESS');

});
router.post('/edito', function (request, response) {
// router.post('/', function (request, response) {
    'use strict';
    console.log('[%s]        called POST to /edito', path.basename(__filename));
    console.dir(request.body);
    var db = 'edito_test';
    var collection = 'project';
    dbMgr.insert(request.body, db, collection);
    response.send('POST SUCCESS');

});
router.use(function (request, response, next) {
    'use strict';
    var err = new Error('Not Found');
    err.status = 404;
    console.log('[%s]        no request handler found', path.basename(__filename));
    next();
});

module.exports = router;