'use strict'

var express = require('express');
var VeterinaryController = require('../controllers/veterinary');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/veterinaries'});

api.get('/pruebas-veterinary', mdAuth.ensureAuth, VeterinaryController.pruebas);


module.exports = api;