require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

// app.all('/*', function (req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,DeviceAccessToken,Device-Access-Token');
//     next();
// });
app.use(cors());
// app.use(cors({
//     exposedHeaders: ['Link']
// }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// used JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/files/upload','/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/files', require('./controllers/files.controller'));

// start server
var port = 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});