'use strict';

/**
 * API routes
 *
 * @author ljd
 **/



// Dependencies
var express = require('express');
var router = express.Router();


// Routes
router.get('/test', function (req, res) {
	res.send('TEST IS WORKING');
});



// Export
module.exports = router;