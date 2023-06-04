const express = require("express");
const router = express.Router();
const availabilitiesController = require("../controllers/availabilities.js");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, availabilitiesController.create);
router.post("/getbydriver", jwt.authenticateToken, availabilitiesController.getAvailabilitiesByDriver);
router.post("/getById", availabilitiesController.getById);

module.exports = router;