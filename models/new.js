'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewSchema = Schema({
	title: String,
	description: String,
	date: String,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('New', NewSchema);