var express = require("express");
var router = express.Router();

// CREATE clientes
router.get("/novo", (req, res, next) => {
  res.render("novo", { title: "Novo Cadastro de Cliente", doc: {"nome":"","idade":"","profissão":""}, action: '/novo' });
}); 

router.post("/novo", (req, res) => {
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  let profissão = req.body.profissão;
  global.db.insertOne({nome, idade, profissão}, (err, result) => {
    if (err) { return console.log(err);}
    res.redirect('/');
  });
});

// READ ALL clientes
router.get("/", (req, res) => {
  global.db.findAll((e, docs) => {
    if (e) {
      return console.log(e);
    }
    res.render("index", { title: "Lista de Clientes", docs: docs });
  });
});

// READ UM CLIENTE
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  global.db.findOne(id, (e,docs) => {
    if(e) {return console.log(e);}
    res.render('novo', {title: 'Edição de Cliente', doc: docs[0], action:'/edit/' + docs[0]._id});
  })
});


// EDITANDO UM CLIENTE
router.post('/edit/:id', (req, res) => {
  let id = req.params.id;
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  let profissão = req.body.profissão;
  global.db.update(id, {nome, idade, profissão}, (e, result) =>{
    if(e) {return console.log(e);}
    res.redirect('/');
  });
});

// DELETANDO UM CLIENTE
router.get('/delete/:id', (req,res) => {
  let id = req.params.id;
  global.db.deleteOne(id, (e,result) => {
    if(e) {return console.log(e);}
        res.redirect('/');
  });
});

module.exports = router
