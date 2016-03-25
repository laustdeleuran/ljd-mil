'use strict';

/**
 * API routes
 *
 * @author ljd
 **/



// Dependencies
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Middlware
router.use(bodyParser.urlencoded({ extended: true})); 
router.use(bodyParser.json());


// Routes
var User = require('../models/user');
User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/users');

var Vehicle = require('../models/vehicle');
Vehicle.methods(['get', 'put', 'post', 'delete']);
Vehicle.register(router, '/vehicles');

var Log = require('../models/log');
Log.methods(['get', 'put', 'post', 'delete']);
Log.register(router, '/logs');



// Export
module.exports = router;