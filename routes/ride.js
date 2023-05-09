const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rides");

router.post("/create", rideController.create);
router.post("/getbydriver", rideController.getRidesByDriver);


module.exports = router;
