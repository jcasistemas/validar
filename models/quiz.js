// Definicion de la tabla Quiz
module.exports = function(sequelize, DataTypes) {
  	return sequelize.define('Quiz',
		{ pregunta: {
			type: DataTypes.STRING,
			// Paso 12 - Validación de error (Campo vacio)
			validate: { notEmpty: { msg: "Introduzca la pregunta" } }
		  },
		  respuesta: {
		  	type: DataTypes.STRING,
		  	validate: { notEmpty: { msg: "Introduzca la Respuesta" } }
		  },
		  tema: {
		  	type: DataTypes.STRING,
		  	validate: { notEmpty: { msg: "Introduzca el Tema" } }
		  }
		}
	);
}
