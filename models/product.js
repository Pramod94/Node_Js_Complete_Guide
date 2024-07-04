const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Here with the help of sequelize we are defining the table
// here it is product table with all the columns such as id, title etc

// Note : when we call sync() method on sequelize, it actually collects all the models
// defined using sequelize.define() and syncs to the DB
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
