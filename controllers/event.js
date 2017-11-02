'use strict'

var fs = require('fs');
var path = require('path');

//modelos
var Event = require('../models/event');
var User = require('../models/user');

//servicio

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: "Probando el controlador de eventos y la accion prueba"
	});
}

function saveEvent(req, res){
	var event = new Event;

	var params = req.body;

	if(!params){
		event.title = params.title;
		event.description = params.description;
		event.place = params.place;
		event.date_begin = params.date;
		event.date_end = params.date_end;
		event.image = null
		event.user = req.user.sub;

		event.save((err, eventStored) => {
			if(err){
				res.status(500).send({ error: 'Something failed!' });
			}
			else{
				if(!eventStored){
					res.status(500).send({ message: "no se ha guardado la noticia" });
				}
				else
				{
					res.status(200).send({eventStored});
				}
			}
		});
	}
	else
	{
		res.status(200).send({message: "there isn't params to store"});
	}

	//res.status(200).send({message: "Probando el metodo de guardar"})
}

function getEvents(req, res){
	Events.find({}).populate({path: 'user'}).exec((err, events) =>{
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!events){
				res.status(404).send({ error: 'no se pudo encontrar veterinarias' });
			}
			{
				res.status(200).send({events});
			}
		}
	});
}

function getEvent(req, res){
	var eventId = req.params.id;
	Event.findById(eventId).populate({path: 'user'}).exec((err, event) => {
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!event){
				res.status(404).send({ error: 'no se pudo encontrar la noticia' });
			}
			{
				res.status(200).send({event});
			}
		}
	})
}

function updateEvent(req, res){
	var eventId = req.params.id;
	var update = req.body;

	Event.findByIdAndUpdate(eventId, update, {new:true}, (err, eventUpdate) =>{
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!eventUpdate){
				res.status(404).send({ error: 'no se pudo actualizar el noticia' });
			}
			else
			{
				res.status(200).send({eventUpdate});
			}
		}
	})
}

function uploadImage(req, res){
	var eventId = req.params.id;
	var file_name = 'empty';
	//console.log(req.files);
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		file_name = file_split[2];

		var ext_split = file_name.split('.');
		var file_ext = ext_split[1];
		
		if(file_ext == "png" || file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif"){
			
			/*if(animalId != req.animal.sub){
				return res.status(404).send({
					message: "no tienes permiso para actualizar el animal"
				})
			}*/

			Event.findByIdAndUpdate(eventId, {image: file_name}, {new:true}, (err, eventUpdate) =>{
				if (err) {
					res.status(500).send({message:'Error al actualizar la noticia'});
				}else{
					if(!eventUpdate){
						res.status(404).send({message:'no se ha podido actualizar la noticia'});
					}else{
						res.status(200).send({event: eventUpdate, image: file_name});
					}
				}
			});

		}else{
			fs.unlink(file_path, (err) =>{
				if (err) {
					res.status(200).send({message:'invalid form and file erase'});
				}
				else{
					res.status(200).send({message:'invalid form'});
				}
			});
		}
		
	}else{
		res.status(404).send({message:'the image has not been upload'});
	}
}

function deleteImage(req,res){
	var image = req.params.image;
	var file_path = "uploads/events/"+image;
	if(req.params.image == null){
		res.status(404).send({message: 'there is not image to delete'});
	}
	else
	{
		fs.unlink(file_path, (err) =>{
			if (err) {
				res.status(200).send({message:'the file was not delete'});
			}
			else{
				res.status(200).send({message:'file erase correctly'});
			}
		});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var pathFile = './uploads/events/'+imageFile;

	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else
		{
			res.status(404).send({message:'the image doesnt exists'});
		}
		
	});
	//res.status(200).send({message:'get image file'});
}

function deleteEvent(req, res){
	var eventId = req.params.id;

	Event.findByIdAndRemove(eventId, (err, eventRemove) => {
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!eventRemove){
				res.status(404).send({ error: 'no se ha podido borrar la noticia ' });
			}
			else
			{
				res.status(200).send({eventRemove});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveEvent,
	updateEvent,
	getEvent,
	getEvents,
	deleteEvent,
	getImageFile,
	uploadImage,
	deleteImage

}