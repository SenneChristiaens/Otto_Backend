const express = require("express");
const router = express.Router();
const driverController = require("../controllers/drivers");

router.post("/create", driverController.create);
router.post("/login", driverController.login);


module.exports = router;
