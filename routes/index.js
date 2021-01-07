const express = require('express');
const router = express.Router();
const userSchema = require("../models/userSchema")

// VALIDAÇÃO 
const validation = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');

    console.log("error", message);
    res.status(422).json({ error: message})
  }
}

//pg CREATE clientes
router.get("/novo", (req, res, next) => {
  res.render("novo", {
    title: "Novo Cadastro de Cliente",
    doc: { nome: "", idade: "", profissão: "" },
    action: "/novo",
  });
});

// INSERINDO CLIENTES
router.post("/novo", validation, (req, res) => {
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  let profissão = req.body.profissão;
  global.db.insertOne({ nome, idade, profissão }, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

// READ UM CLIENTE
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  global.db.findOne(id, (e, docs) => {
    if (e) {
      return console.log(e);
    }
    res.render("novo", {
      title: "Edição de Cliente",
      doc: docs[0],
      action: "/edit/" + docs[0]._id,
    });
  });
});

// EDITANDO UM CLIENTE
router.post("/edit/:id", validation, (req, res) => {
  let id = req.params.id;
  let nome = req.body.nome;
  let idade = parseInt(req.body.idade);
  let profissão = req.body.profissão;
  global.db.update(id, { nome, idade, profissão }, (e, result) => {
    if (e) {
      return console.log(e);
    }
    res.redirect("/");
  });
});

// DELETANDO UM CLIENTE
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  global.db.deleteOne(id, (e, result) => {
    if (e) {
      return console.log(e);
    }
    res.redirect("/");
  });
});

// READ ALL CLIENTES
router.get("/:pagina?", async (req, res) => {
  const pagina = parseInt(req.params.pagina || '1');
  const docs = await global.db.findAll(pagina);
  const count = await global.db.countAll();
  const qtdPaginas = Math.ceil(count / global.db.tamanhoPagina);
      res.render("index", { title: "Lista de Clientes", docs, count, qtdPaginas, pagina });
  });

module.exports = router;
