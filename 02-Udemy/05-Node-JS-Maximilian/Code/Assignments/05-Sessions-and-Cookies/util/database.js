const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callBack) => {
  MongoClient.connect(
    "mongodb+srv://ahmedosamaalsawah:Mongo%40742002@cluster0.0dvsymx.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callBack();
    })
    .catch((error) => {
      throw error;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw "No Database Found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
