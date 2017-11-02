'use strict'

var express = require('express');
var EventController = require('../controllers/event');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");
var mdAdmin = require("../middlewares/is_admin");

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/events'});

api.get('/pruebas-event', mdAuth.ensureAuth, EventController.pruebas);
api.post('/save-event', mdAuth.ensureAuth, EventController.saveEvent);
api.put('/update-event/:id', mdAuth.ensureAuth, EventController.updateEvent);
api.get('/get-event/:id', EventController.getEvent);
api.get('/get-events', EventController.getEvents);
api.delete('/delete-event/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], EventController.deleteEvent);
api.delete('/delete-image-event/:image', mdAuth.ensureAuth, EventController.deleteImage);


module.exports = api;