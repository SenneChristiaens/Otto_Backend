const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rides");

router.post("/create", rideController.create);
router.post("/getbydriver", rideController.getRidesByDriver);
router.post("/getbyid", rideController.getById);
router.post("/getavailablerides", rideController.getAvailableRides);
router.post("/accept", rideController.accept);


module.exports = router;
