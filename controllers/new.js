'use strict'

var fs = require('fs');
var path = require('path');

//modelos
var New = require('../models/new');
var User = require('../models/user');

//servicio

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: "Probando el controlador de noticias y la accion prueba"
	});
}

function saveNews(req, res){
	var news = new New;

	var params = req.body;

	if(!params){
		news.title = params.title;
		news.description = params.description;
		news.date = params.date;
		news.image = null;
		news.user = req.user.sub;

		news.save((err, newsStored) => {
			if(err){
				res.status(500).send({ error: 'Something failed!' });
			}
			else{
				if(!newsStored){
					res.status(500).send({ message: "no se ha guardado la noticia" });
				}
				else
				{
					res.status(200).send({newsStored});
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

function getNews(req, res){
	News.find({}).populate({path: 'user'}).exec((err, news) =>{
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!news){
				res.status(404).send({ error: 'no se pudo encontrar noticias' });
			}
			{
				res.status(200).send({news});
			}
		}
	});
}

function getNew(req, res){
	var newId = req.params.id;
	New.findById(newId).populate({path: 'user'}).exec((err, news) => {
		if(err){
				res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!news){
				res.status(404).send({ error: 'no se pudo encontrar la noticia' });
			}
			{
				res.status(200).send({news});
			}
		}
	})
}

function updateNews(req, res){
	var newsId = req.params.id;
	var update = req.body;

	News.findByIdAndUpdate(newsId, update, {new:true}, (err, newsUpdate) =>{
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!newsUpdate){
				res.status(404).send({ error: 'no se pudo actualizar el noticia' });
			}
			else
			{
				res.status(200).send({newsUpdate});
			}
		}
	})
}

function uploadImage(req, res){
	var newsId = req.params.id;
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

			News.findByIdAndUpdate(newsId, {image: file_name}, {new:true}, (err, newsUpdate) =>{
				if (err) {
					res.status(500).send({message:'Error al actualizar la noticia'});
				}else{
					if(!newsUpdate){
						res.status(404).send({message:'no se ha podido actualizar la noticia'});
					}else{
						res.status(200).send({news: newsUpdate, image: file_name});
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
	var file_path = "uploads/news/"+image;
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
	var pathFile = './uploads/news/'+imageFile;

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

function deleteNews(req, res){
	var newsId = req.params.id;

	News.findByIdAndRemove(newsId, (err, newsRemove) => {
		if(err){
			res.status(500).send({ error: 'Something failed!' });
		}
		else
		{
			if(!newsRemove){
				res.status(404).send({ error: 'no se ha podido borrar la noticia ' });
			}
			else
			{
				res.status(200).send({newsRemove});
			}
		}
	});
}


module.exports = {
	pruebas,
	saveNews,
	getNews,
	getNew,
	updateNews,
	uploadImage,
	getImageFile,
	deleteNews,
	deleteImage

}