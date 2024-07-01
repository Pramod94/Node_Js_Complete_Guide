const mysql = require("mysql2");

// Make use of MySql workbench to create the DB

// creates the pool of connections
// In here we need to provide the database details to access
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "PmdM@4444",
});

module.exports = pool.promise();
