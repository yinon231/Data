const mongoose = require("mongoose");
const donorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  { _id: false }
);
const donationSchema = new mongoose.Schema({
  id: Number,
  donor: donorSchema,
  amount: Number,
  date: Date,
  status: String,
});

// Create a model based on the schema
const donationModel = mongoose.model("donations", donationSchema);
exports.donationModel = donationModel;
