// sequelize will intern handles the SQL queries
// so that we can access data from DB with the help of sequelize methods
// instead of writing plain SQL queries
const Sequelize = require("sequelize");

// DB name, username and its password
const sequelize = new Sequelize("node-complete", "root", "PmdM@4444", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
