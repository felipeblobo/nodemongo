const mongoClient = require('mongodb').MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true}).then(conn => global.conn = conn.db("nodemongo")).catch(err => console.log(err))

function findAll(callback) {
    global.conn.collection("clientes").find({}).toArray(callback);
}

module.exports = {findAll}
