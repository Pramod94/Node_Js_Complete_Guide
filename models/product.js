const db = require("../util/database");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // inserting values into products table
    // VALUES(?, ?, ?, ?) means values are dynamically added which we are passing
    //  in second argument i.e [this.title, this.price, this.description, this.imageUrl]
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    // Here we are extracting all the products from products table which returns a promise
    return db.execute("SELECT * FROM products");
  }

  // Fetching the specific product with the help of productId
  static fetchSpecificProduct(productId) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [
      productId,
    ]);
  }
};
