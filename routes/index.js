var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bienvenido a Quiz !!! <br><h3><span style="color:red;">¿Escapado?</span><h3>' });
});

module.exports = router;
