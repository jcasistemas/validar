var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Respondiendo con un Recurso ...');
});

module.exports = router;
