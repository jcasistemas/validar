var express = require('express');
var router = express.Router();

// Version 2 - Importar el controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('portada', { title: ' a Quiz !!!' });
});

// Paso 10 - Autoload
// Autoload de comandos con el parametro :quizId
router.param('quizId', quizController.load);  

// Paso 9 - Multiples preguntas
// Definición de rutas de /quizes
router.get('/quizes',                      	quizController.index);
router.get('/quizes/:quizId(\\d+)',        	quizController.show);
router.get('/quizes/:quizId(\\d+)/respuesta', quizController.respuesta);

// colocar buscador (Fin Tema 9)
router.get('/quizes/search',               quizController.buscar);

router.get('/quizes/autor', quizController.autor);

// Para cualquier ruta Inexistente
router.get( '*', function(req, res) {
  res.render('portada', { title: '' });
});

module.exports = router;
