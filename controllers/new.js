'use strict'

var fs = require('fs');
var path = require('path');

//modelos
var New = require('../models/new');

//servicio

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: "Probando el controlador de noticias y la accion prueba"
	});
}

module.exports = {
	pruebas
}