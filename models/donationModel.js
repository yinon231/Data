const mongoose = require("mongoose");
const Joi = require("joi");
const donorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  { _id: false }
);
const donationSchema = new mongoose.Schema({
  donor: donorSchema,
  amount: Number,
  date: String,
  status: String,
});

const donationModel = mongoose.model("donations", donationSchema);
const validateDonation = (donation) => {
  const schema = Joi.object({
    donor: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    }).required(),
    amount: Joi.number().required(),
    date: Joi.string().required(),
    status: Joi.string().required(),
  });
  return schema.validate(donation);
};
const validateDonationUpdate = (donation) => {
  const updateSchema = Joi.object({
    donor: Joi.object({
      name: Joi.string(),
      email: Joi.string(),
    }),
    amount: Joi.number(),
    date: Joi.string(),
    status: Joi.string(),
  });
  return updateSchema.validate(donation);
};
module.exports = { donationModel, validateDonationUpdate, validateDonation };
