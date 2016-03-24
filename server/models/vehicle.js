'use strict';

/**
 * Vehicles - based on https://www.youtube.com/watch?v=p-x6WdwaJco
 *
 * @author ljd
 **/



// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;


// Scheme
var vehicleSchema = new Schema({
	_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	name: String,
	created: Date,
	logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }]
});



// Export
module.exports = restful.model('Vehicle', vehicleSchema);