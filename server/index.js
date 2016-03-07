/**
 * Server
 * 
 * Mini Express server to serve client-side files
 *
 * @author ljd
 **/
/* jshint node:true */
'use strict';


// Dependencies
var path = require('path');
var express = require('express');
var pkg = require('./../package.json');


// Basic initialization
var port = process.env.PORT || 2000;
var paths = {
	app: path.join(__dirname, '../dist')
};
var app = express();

//app.use($.connectLivereload());
app.use(express.static(paths.app));

// Let's get this show on the road!
app.listen(port, function() {
	console.log('\r\n');
	console.log(':: server running :');
	console.log(':: serving content from => \'%s\'', paths.app);
	console.log(':: %s (v%s) is running on => \'http://localhost:%d\'', pkg.name, pkg.version, port);
});

// All not predefined routes go to index.html. Angular handles the rest
app.use(function(req, res) {
	res.sendFile(paths.app + '/index.html');
});