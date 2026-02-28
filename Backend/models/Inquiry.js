const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "New" } // New | Read
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
