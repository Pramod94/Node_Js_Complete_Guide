const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  // method with static keyword will allow the method to call directly from class without creating its instance
  static fetchAll() {
    return products;
  }
};
