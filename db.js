const mongoClient = require('mongodb').MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true}).then(conn => global.conn = conn.db("nodemongo")).catch(err => console.log(err))

var ObjectId = require('mongodb').ObjectId;

// função para inserir um registro de cliente
function insertOne(cliente, callback) {
    global.conn.collection('clientes').insertOne(cliente, callback);
}

// função para procurar todos os clientes
function findAll(callback) {
    global.conn.collection('clientes').find({}).toArray(callback);
}

// função para encontrar cliente específico
function findOne(id, callback) {
    global.conn.collection('clientes').find(new ObjectId(id)).toArray(callback);
}

// função para editar cliente específico
function update(id, cliente, callback) {
    global.conn.collection('clientes').updateOne({_id: new ObjectId(id)},{$set: cliente}, callback);
}

// função para deletar cliente específico
function deleteOne(id, callback) {
    global.conn.collection('clientes').deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = {findAll, insertOne, findOne, update, deleteOne}
