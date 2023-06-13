const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residents");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, residentController.create);
router.put("/edit/:id", jwt.authenticateToken, residentController.edit);
router.get("/:id", jwt.authenticateToken, residentController.getById);

module.exports = router;
