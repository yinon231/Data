const { donationModel } = require("../models/donationModel");
exports.donationRepository = {
  getDonations: async () => {
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
    return newDonation;
  },
  updateDonation: async (id, donation) => {
    const updateDonation = await donationModel.findOneAndUpdate(
      { id },
      donation
    );
    return updateDonation;
  },
  deleteDonaotion: async (id) => {
    const deletedDonation = await donationModel.findOneAndDelete({ id });
    return deletedDonation;
  },
};
