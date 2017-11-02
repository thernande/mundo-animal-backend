'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({
	title: String,
	description: String,
    date_begin: Date,
    date_end: Date,
    place: String,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('event', EventSchema);