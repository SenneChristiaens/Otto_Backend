const express = require("express");
const router = express.Router();
const driverController = require("../controllers/drivers");
const jwt = require('../middleware/jwt.js');

router.post("/create", driverController.create);
router.post("/login", driverController.login);
router.post("/auth", jwt.authenticateToken, driverController.isAuth);
router.post("/info", jwt.authenticateToken, driverController.getInfo);

module.exports = router;