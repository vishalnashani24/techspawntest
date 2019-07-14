'use strict';

var mongoose = require('mongoose');

/* DB */
var mongoose = require('mongoose');

require('../api/models/users')

mongoose.connect("mongodb://localhost:27017/Test");
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function() {
    console.log("Database conencted successfullyyy!");
});
