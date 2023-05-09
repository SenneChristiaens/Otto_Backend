const express = require("express");
const router = express.Router();
const availabilitiesController = require("../controllers/availabilities");

router.post("/create", availabilitiesController.create);
router.post("/getAvailabilitiesByDriver", availabilitiesController.getAvailabilitiesByDriver);
router.post("/getById", availabilitiesController.getById);

module.exports = router;
