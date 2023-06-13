const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rides.js");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, rideController.create);
router.post("/getbydriver", jwt.authenticateToken, rideController.getRidesByDriver);
router.post("/getbyid", jwt.authenticateToken, rideController.getById);
router.post("/getavailablerides", jwt.authenticateToken, rideController.getAvailableRides);
router.post("/accept", jwt.authenticateToken, rideController.accept);
router.get("/:id", jwt.authenticateToken, rideController.getById);

module.exports = router;
