'use strict'

var fs = require('fs');
var path = require('path');

//modelos
var Veterinary = require('../models/veterinary');

//servicio

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: "Probando el controlador de veterinaria y la accion prueba"
	});
}

module.exports = {
	pruebas
}