const path = require("path");

// This helps to find the directory name for the file path
module.exports = path.dirname(process.mainModule.filename);
