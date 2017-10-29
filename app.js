'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var new_routes = require('./routes/new');
var event_routes = require('./routes/event');
var veterinary_routes = require('./routes/veterinary');

//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
})

// rutas body-parser
app.use('/api', user_routes);
app.use('/api', new_routes);
app.use('/api', event_routes);
app.use('/api', veterinary_routes);

 /* app.get('/probando', (req,res) => {
	res.status(200).send({message:'prueba de mensaje'});
});
*/
module.exports = app;