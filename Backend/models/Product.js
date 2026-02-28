const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },     // 👈 MUST be "name"
  category: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
