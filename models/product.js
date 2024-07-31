const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Mongoose supports both Schema and Schemaless architecture to save the data to db
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Model name will be used to save to the db by converting it into lowercase and plurals .i.e
// In db you will see "products" as the storage name
module.exports = mongoose.model("Product", productSchema);
