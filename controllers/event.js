'use strict'

var fs = require('fs');
var path = require('path');

//modelos
var Event = require('../models/event');

//servicio

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: "Probando el controlador de eventos y la accion prueba"
	});
}

module.exports = {
	pruebas
}