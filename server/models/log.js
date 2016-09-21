'use strict';

/**
 * Log Entry - based on https://www.youtube.com/watch?v=p-x6WdwaJco
 *
 * @author ljd
 **/



// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;


// Scheme
var logSchema = new Schema({
	_vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
	distance: Number,
	volume: Number,
	price: Number,
	date: { type: Date, default: Date.now }
});



// Export
module.exports = restful.model('Log', logSchema);