'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_55jm3pmq:ml9pem5b022abv3nna8ujgqog6@ds133932.mlab.com:33932/heroku_55jm3pmq',{ useMongoClient: true }).then(() => {
			console.log('la conexion a la base de datos se ha realizado correctamente...');

			app.listen(port, () => {
				console.log("el servidor local con node esta corriendo");
			})
	})
	.catch(err => console.log(err));
