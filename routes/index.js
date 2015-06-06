var express = require('express');
var router = express.Router();

// Version 2 - Importar el controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('portada', { title: 'Bienvenido a Quiz !!!' });
});

// Version 2 - Importar el controlador
router.get('/quizes/pregunta', quizController.pregunta);
router.get('/quizes/respuesta', quizController.respuesta);

module.exports = router;
