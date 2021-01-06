const mongoClient = require("mongodb").MongoClient;
mongoClient
  .connect("mongodb://localhost", { useUnifiedTopology: true })
  .then((conn) => (global.conn = conn.db("nodemongo")))
  .catch((err) => console.log(err));

var ObjectId = require("mongodb").ObjectId;

const tamanhoPagina = 10;

// função para inserir um registro de cliente
function insertOne(cliente, callback) {
  global.conn.collection("clientes").insertOne(cliente, callback);
}

// função para procurar todos os clientes
function findAll(pagina) {
  const tamanhoSkip = tamanhoPagina * (pagina - 1);
    return global.conn
    .collection("clientes")
    .find({})
    .skip(tamanhoSkip)
    .limit(tamanhoPagina)
    .toArray();
}

// função para encontrar cliente específico
function findOne(id, callback) {
  global.conn.collection("clientes").find(new ObjectId(id)).toArray(callback);
}

// função para editar cliente específico
function update(id, cliente, callback) {
  global.conn
    .collection("clientes")
    .updateOne({ _id: new ObjectId(id) }, { $set: cliente }, callback);
}

// função para deletar cliente específico
function deleteOne(id, callback) {
  global.conn
    .collection("clientes")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}
// quantidade de clientes 
function countAll(){
    return global.conn.collection('clientes').countDocuments();
}

module.exports = { findAll, insertOne, findOne, update, deleteOne, tamanhoPagina, countAll };
