// Define como se construye todo el modelo 
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
  {dialect: "sqlite", storage: "quiz.sqlite"} // Archivo donde se guardaran los datos. BD (/quiz.sqlite)
);

// Importar la definicion de la tabla Quiz que está en /models/quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz para usarla en otros lugares de la aplicacion

// Paso 2b. Inicializar la BD

// sequelize.sync() crea e inicializa tabla de preguntas en DB - Forma Nueva
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){ // No de elementos de la tabla
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
      	           })
      .success(function(){console.log('Base de datos inicializada')});
    };
  });
});