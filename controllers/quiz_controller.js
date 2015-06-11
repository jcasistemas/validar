// GET /quizes/pregunta
var models = require('../models/models.js'); // Dirección del modelo

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes });
  })
};

// GET /quizes/:id
exports.show = function( req, res) {
	models.Quiz.find( req.params.quizId ).then(function(quiz) {
      res.render('quizes/show', { quiz: quiz } );
	})
};

// GET /quizes/:id/respuesta
exports.respuesta = function( req, res) {
	models.Quiz.find( req.params.quizId ).then(function(quiz) {
	    if (req.query.respuesta === quiz.respuesta) {
	      res.render('quizes/respuesta', { quiz: quiz, respuesta: 'Correcto' });
	    } else {
	      res.render('quizes/respuesta', { quiz: quiz, respuesta: 'Incorrecto'});
	    }
	})
};

//Get /quizez/creditos
exports.autor = function( req, res) {
	res.render("quizes/autor", {title: "EQUIPO DE DESARROLLO" });
};
