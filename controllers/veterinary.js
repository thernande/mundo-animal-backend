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

function saveVeterinary(req, res){
	var veterinary = new Veterinary;

	var params = req.body;

	if(!params){
		veterinary.name = params.name;
		veterinary.direction = params.description;
		veterinary.phone = params.date;
		veterinary.image = null;
		veterinary.email = params.email;

		veterinary.save((err, veterinaryStored) => {
			if(err){
				res.status(500).send({ error: 'Something failed!' });
			}
			else{
				if(!veterinaryStored){
					res.status(500).send({ message: "no se ha guardado la noticia" });
				}
				else
				{
					res.status(200).send({veterinaryStored});
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

function getVeterinaries(req, res){
	Veterinaries.find({}).exec((err, veterinaries) =>{
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!veterinaries){
				res.status(404).send({ error: 'no se pudo encontrar veterinarias' });
			}
			{
				res.status(200).send({veterinaries});
			}
		}
	});
}

function getVeterinary(req, res){
	var veterinaryId = req.params.id;
	Veterinary.findById(veterinaryId).exec((err, veterinary) => {
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!veterinary){
				res.status(404).send({ error: 'no se pudo encontrar la noticia' });
			}
			{
				res.status(200).send({veterinary});
			}
		}
	})
}

function updateVeterinary(req, res){
	var veterinaryId = req.params.id;
	var update = req.body;

	Veterinary.findByIdAndUpdate(veterinaryId, update, {new:true}, (err, veterinaryUpdate) =>{
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!veterinaryUpdate){
				res.status(404).send({ error: 'no se pudo actualizar el noticia' });
			}
			else
			{
				res.status(200).send({veterinaryUpdate});
			}
		}
	})
}

function uploadImage(req, res){
	var veterinaryId = req.params.id;
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

			Veterinary.findByIdAndUpdate(veterinaryId, {image: file_name}, {new:true}, (err, veterinaryUpdate) =>{
				if (err) {
					res.status(500).send({message:'Error al actualizar la noticia'});
				}else{
					if(!veterinaryUpdate){
						res.status(404).send({message:'no se ha podido actualizar la noticia'});
					}else{
						res.status(200).send({veterinary: veterinaryUpdate, image: file_name});
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
	var file_path = "uploads/veterinaries/"+image;
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
	var pathFile = './uploads/veterinaries/'+imageFile;

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

function deleteVeterinary(req, res){
	var veterinaryId = req.params.id;

	Veterinary.findByIdAndRemove(veterinaryId, (err, veterinaryRemove) => {
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!veterinaryRemove){
				res.status(404).send({ error: 'no se ha podido borrar la noticia ' });
			}
			else
			{
				res.status(200).send({veterinaryRemove});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveVeterinary,
	updateVeterinary,
	getVeterinary,
	getVeterinaries,
	deleteVeterinary,
	getImageFile,
	uploadImage,
	deleteImage

}