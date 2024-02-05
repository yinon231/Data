const { donationModel } = require("../models/donationModel");
exports.donationRepository = {
  getDonation: async () => {
    const donations = await donationModel.find({});
    return donations;
  },
  getDonationbyId: async (id) => {
    const donation = await donationModel.find({ id });
    return donation;
  },
  createDonation: async (donation) => {
    const newDonation = new donationModel(donation);
    await newDonation.save();
  },
  updateDonation: async (id, donation) => {
    await donationModel.findOneAndUpdate({ id }, donation);
  },
  deleteDonaotion: async (id) => {
    const deletedDonation = await donationModel.findOneAndDelete({ id });
    return deletedDonation;
  },
};
