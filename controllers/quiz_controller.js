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
		res.render('quizes/index', { quizes: quizes, subtitulo: "" });
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

// colocar buscador (Fin Tema 9)
//Get /quizez/:search
exports.buscar = function( req, res) {
	// Validar que el nombre del parametro exista (No se haya modificado en la ruta)
	if( req.query.search === undefined ) {
		res.render('quizes/index', { quizes: {}, subtitulo: "No es posible efectuar la búsqueda" });
	} else {
		// Validar que se haya escrito a menos un caracter para buscar
		if( req.query.search.length === 0 ) {
			res.render('quizes/index', { quizes: {}, subtitulo: "Escriba algun texto a buscar" });
		} else {
console.log("Largo=" + req.query.search.length )
			// Procesar el texto recibido a un formato adecuado para la búsquda
			cadena = req.query.search;
			console.log("\nRecibi: '" + cadena + "'" );
			// Eliminar espacios al comienzo y al final de la respuesta
			cadena = cadena.trim();
			// Eliminar mas de un espacio contiguo entre palabras
			cadena = cadena.replace(/\s+/g, ' ');
			// Reemplazar los espacios encontrados ' ' por el caracter %
			cadena = cadena.replace(/\s/g, '%');
			// Colocar el texto a buscar entre los caracteres '%'
			cadena = '%' + cadena + '%';
			console.log("Proceso: '" + cadena + "'\n");

      // Busqueda de las palabras y mostrando el resultado de forma ASCendente
			models.Quiz.findAll(
        { where: [ "pregunta like ?", cadena ],
          order: [[ 'pregunta', 'ASC' ]] } ).then( function(quizes) {
				    // Mensaje a mostrar de acuerdo al resultado de la búsqueda
    				var elSubtitulo = quizes.length + " Pregunta" + ( quizes.length===1?"":"s") + " con el patrón: '" + req.query.search.trim() + "'";
    				res.render('quizes/index', { quizes: quizes, subtitulo: elSubtitulo });
			}).catch(function(error) { next(error); })
		}
	}
};
