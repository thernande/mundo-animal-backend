'use strict'

var express = require('express');
var VeterinaryController = require('../controllers/veterinary');

var api = express.Router();
var mdAuth = require("../middlewares/authenticated");
var mdAdmin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/veterinaries'});

api.get('/pruebas-veterinary', mdAuth.ensureAuth, VeterinaryController.pruebas);
api.post('/save-news', mdAuth.ensureAuth, VeterinaryController.saveVeterinary);
api.put('/update-news/:id', mdAuth.ensureAuth, VeterinaryController.updateVeterinary);
api.get('/get-new/:id', VeterinaryController.getVeterinary);
api.get('/get-news', VeterinaryController.getVeterinaries);
api.delete('/delete-news/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], VeterinaryController.deleteVeterinary);
api.delete('/delete-image-news/:image', mdAuth.ensureAuth, VeterinaryController.deleteImage);


module.exports = api;