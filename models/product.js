const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const productFile = path.join(rootDir, "data", "products.json");

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(productFile, (err, fileContent) => {
      let products = [];

      // If no error while reading the file, parse the existing content and store in products array
      if (!err) {
        products = JSON.parse(fileContent);
      }

      // push the incoming content to the array
      products.push(this);

      // create a new or add content to the existing file
      fs.writeFile(productFile, JSON.stringify(products), (err) => {
        console.log("Error writing to file", err);
      });

      //   OR - We can also write like below

      //   if (err) {
      //     console.log("Error while reading a file", err);
      //     products.push(this);
      //     fs.writeFile(productFile, JSON.stringify(products), (err) => {
      //       console.log("Error writing to file", err);
      //     });
      //   } else {
      //     products = JSON.parse(fileContent);

      //     products.push(this);

      //     fs.writeFile(productFile, JSON.stringify(products), (err) => {
      //       console.log("Error writing to file", err);
      //     });
      //   }
    });
  }

  // method with static keyword will allow the method to call directly from class without creating its instance
  static fetchAll() {
    return products;
  }
};
