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
};
