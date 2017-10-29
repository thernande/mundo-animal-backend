'use strict'

var express = require('express');
var EventController = require('../controllers/event');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/events'});

api.get('/pruebas-event', mdAuth.ensureAuth, EventController.pruebas);


module.exports = api;