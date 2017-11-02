'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = Schema({
	title: String,
	description: String,
	date: String,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('News', NewsSchema);