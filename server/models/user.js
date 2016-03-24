'use strict';

/**
 * Users - based on https://www.youtube.com/watch?v=p-x6WdwaJco
 *
 * @author ljd
 **/



// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;


// Scheme
var userSchema = new Schema({
	name: String,
	email: { type: String, index: true, unique: true, dropDups: true },
	authResponse: Object,
	vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
});



// Export
module.exports = restful.model('Users', userSchema);