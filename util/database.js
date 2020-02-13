const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let db;

exports.mongoConnect = callback => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}/riddle?retryWrites=true&w=majority`,
    {useUnifiedTopology: true}
  )
    .then(client => {
      db = client.db("riddle");
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getDB = () => {
  if (db) {
    return db;
  } else {
    throw err;
  }
};
