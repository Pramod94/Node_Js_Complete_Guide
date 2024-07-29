const getDb = require("../util/database_mongodb").getDb;

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // Here we are creating a collection and insert data to it.
  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
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
}

module.exports = Product;
