const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});
const donationSchema = new mongoose.Schema({
  id: Number,
  items: [itemSchema],
});

// Create a model based on the schema
const donationModel = mongoose.model("donations", donationSchema);
exports.donationModel = donationModel;
