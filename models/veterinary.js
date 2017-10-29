'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VeterinarySchema = Schema({
	name: String,
	email: String,
	direction: String,
	phone: String,
	image: String
});

module.exports = mongoose.model('Veterinary', VeterinarySchema);