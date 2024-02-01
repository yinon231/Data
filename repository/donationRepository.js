const { donationModel } = require("../models/donationModel");
const getDonation = async () => {
  const donations = await donationModel.find({});
  return donations;
};
const getDonationbyId = async (id) => {
  const donation = await donationModel.find({ id });
  return donation;
};
module.exports = { getDonation, getDonationbyId };
