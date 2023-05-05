const express = require("express");
const router = express.Router();
const driverController = require("../controllers/drivers");

router.post("/create", driverController.create);
router.post("/login", driverController.login);
router.post("/auth", driverController.isAuth);


module.exports = router;
