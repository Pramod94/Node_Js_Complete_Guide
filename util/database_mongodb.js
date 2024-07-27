const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (cb) => {
  // connection url is available once we create a mongodb account in thier official website
  return await MongoClient.connect(
    "mongodb+srv://pramodmithyantha:Mx0SUYUt5f9sZEcE@cluster0.dk4h42f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to MongoDB...!!!");
      // This stores the access to the Database. Here it will connect and store access to "shop" database
      // If shop db doesn't exists it will create automatically
      _db = client.db("shop");
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found..!!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
