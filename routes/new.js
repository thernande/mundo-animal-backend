'use strict'

var express = require('express');
var NewController = require('../controllers/new');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/news'});
var mdAdmin = require('../middlewares/is_admin');

api.get('/pruebas-new', mdAuth.ensureAuth, NewController.pruebas);
api.post('/save-news', mdAuth.ensureAuth, NewController.saveNews);
api.put('/update-news/:id', mdAuth.ensureAuth, NewController.updateNews);
api.get('/get-new/:id', NewController.getNew);
api.get('/get-news', NewController.getNews);
api.delete('/delete-news/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], NewController.deleteNews);
api.delete('/delete-image-news/:image', mdAuth.ensureAuth, NewController.deleteImage);


module.exports = api;