const express = require("express");
const router = express.Router();
const eldercareController = require("../controllers/eldercares");
const jwt = require('../middleware/jwt.js');

router.post("/create", eldercareController.create);
router.post("/login", eldercareController.login);
router.post("/auth", jwt.authenticateToken, eldercareController.isAuth);
router.post("/getresidents", jwt.authenticateToken, eldercareController.getResidents);
router.get("/:id", eldercareController.getById);

module.exports = router;