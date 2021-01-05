var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e);}  
  res.render('index', { title: 'Lista de Clientes', docs: docs });
  })
});

module.exports = router;
