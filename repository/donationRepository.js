const { donationModel } = require("../models/donationModel");
exports.donationRepository = {
  getDonations: async () => {
    const donations = await donationModel.find({});
    return donations;
  },
  getDonationbyId: async (id) => {
    const donation = await donationModel.find({ _id: id });
    return donation;
  },
  createDonation: async (donation) => {
    const newDonation = await donationModel.create(donation);
    return newDonation;
  },
  updateDonation: async (id, donation) => {
    const updateDonation = await donationModel.findOneAndUpdate(
      { _id: id },
      donation
    );
    return updateDonation;
  },
  deleteDonaotion: async (id) => {
    const deletedDonation = await donationModel.findOneAndDelete({ _id: id });
    return deletedDonation;
  },
};
