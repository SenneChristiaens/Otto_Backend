const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rides");

router.post("/create", rideController.create);


module.exports = router;
