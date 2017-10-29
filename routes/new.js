'use strict'

var express = require('express');
var NewController = require('../controllers/new');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/news'});

api.get('/pruebas-new', mdAuth.ensureAuth, NewController.pruebas);


module.exports = api;