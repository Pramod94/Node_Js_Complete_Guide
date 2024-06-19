const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static updateCartProduct(product, cb) {
    const prodId = product.id;

    // read the cart file
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      let updatedProduct = { ...product, qty: 1, totalPrice: +product.price };

      // If no err while reading the file. i.e there is a data exists in file
      // update the product with quantity and price if not add new product
      if (!err) {
        products = JSON.parse(fileContent);
        const foundProduct = products.find((ele) => ele.id === prodId);
        const prodIndex = products.findIndex((ele) => ele.id === prodId);
        if (foundProduct) {
          foundProduct.qty += 1;
          foundProduct.totalPrice = foundProduct.qty * foundProduct.price;
          products[prodIndex] = foundProduct;
        } else {
          products.push(updatedProduct);
        }
      } else {
        products.push(updatedProduct);
      }

      // Returns the all cart items as an argument to callback function
      cb(products);

      // write the file with new products list
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // Reads the cart items and passed as argument to callback function
  static getAllCartItems(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cb(JSON.parse(fileContent));
      } else {
        cb([]);
      }
    });
  }
};
