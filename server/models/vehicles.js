'use strict';

/**
 * Vehicles - based on https://www.youtube.com/watch?v=p-x6WdwaJco
 *
 * @author ljd
 **/



// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;


// Scheme
var vehicleSchema = new mongoose.Schema({
	name: String,
	created: Date,
	entries: []
});



// Export
module.exports = restful.model('Vehicles', vehicleSchema);