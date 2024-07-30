const mongoDb = require("mongodb");
const getDb = require("../util/database_mongodb").getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id ? new mongoDb.ObjectId(id) : null;
  }

  // Here we are creating a collection and insert data to it.
  save() {
    const db = getDb();
    let dbOp;
    // If _id exists then we update or else create a new one
    if (this._id) {
      dbOp = db
        .collection("products")
        // here we are updaing the specific object with the help of mongodb "updateOne" and "$set" method
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => console.log("result----", result))
      .catch((err) => console.log(err));
  }

  // Here we are looking for a collection and
  // find() will return everying from that collection
  // then convert to array which returns the promise
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((res) => {
        console.log("res", res);
        return res;
      })
      .catch((err) => console.log(err));
  }

  static findOne(prodId) {
    const db = getDb();
    return (
      db
        .collection("products")
        // mongodb adds dynamic id with _id
        // since _id is stored in some mongodb specific ObjectId format, we need to convert our
        // string id into its format
        .find({ _id: new mongoDb.ObjectId(prodId) })
        .next()
        .then((res) => {
          console.log("Found product", res);
          return res;
        })
        .catch((err) => console.log(err))
    );
  }

  static delete(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDb.ObjectId(id) })
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
