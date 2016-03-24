'use strict';

/**
 * Server
 * 
 * Mini Express server to serve client-side files
 *
 * @author ljd
 **/



// Dependencies
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pkg = require('./../package.json');


// Basic initialization
var port = process.env.PORT || 2000;
var app = express();



// Routing: Server

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true})); 
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));



// Routing: Client
var clientPath = path.join(__dirname, '../dist');

// All files in our app path is static files. Treat them as such
app.use(express.static(clientPath)); 

// All not predefined routes go to index.html. Angular handles the rest
app.use(function(req, res) {
	res.sendFile(clientPath + '/index.html');
});




// Start server
app.listen(port, function() {
	console.log('\r\n');
	console.log(':: server running :');
	console.log(':: serving content from => \'%s\'', clientPath);
	console.log(':: %s (v%s) is running on => \'http://localhost:%d\'', pkg.name, pkg.version, port);
});