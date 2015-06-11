// GET /quizes/pregunta
var models = require('../models/models.js'); // Dirección del modelo

// Autoload - Se refactoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then( function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } 
      else { 
      	// next( new Error('No existe la pregunta Nº. ' + quizId)); 
      	// Me parece mejor así gestionar el error
		res.render('quizes/respuesta', { quizId: quizId, respuesta: 'Error' });      	
      }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then( function(quizes) {
		res.render('quizes/index', { quizes: quizes });
	}).catch(function(error) { next(error); })
};

// GET /quizes/:id
exports.show = function( req, res) {
	res.render('quizes/show', { quiz: req.quiz } );
};

// GET /quizes/:id/respuesta
exports.respuesta = function( req, res) {
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta ) {
		resultado = "Correcto";
	}
	res.render('quizes/respuesta', { quiz: req.quiz, respuesta: resultado });
};

//Get /quizez/creditos
exports.autor = function( req, res) {
	res.render("quizes/autor", {title: "EQUIPO DE DESARROLLO" });
};
