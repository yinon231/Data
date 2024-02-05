const { Router } = require("express");
const { donationController } = require("../controller/donationController");
const donationRouter = new Router();
donationRouter.get("/", donationController.getDonation);
donationRouter.get("/:id", donationController.getDonationbyId);
donationRouter.post("/", donationController.createDonation);
donationRouter.put("/:id", donationController.updateDonation);
donationRouter.delete("/:id", donationController.deleteDonaotion);

module.exports = { donationRouter };
