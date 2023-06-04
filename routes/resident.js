const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residents");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, residentController.create);

module.exports = router;
