// GET /quizes/pregunta
var models = require('../models/models.js'); // Dirección del modelo
exports.pregunta = function( req, res) {
	models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/pregunta', { pregunta: quiz[0].pregunta});
};

// GET /quizes/respuesta
exports.respuesta = function( req, res) {
	models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/respuesta', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/respuesta', { respuesta: 'Incorrecto'});
    }
};

//Get /quizez/creditos
exports.autor = function( req, res) {
	res.render("quizes/autor", {title: "EQUIPO DE DESARROLLO" });
};
