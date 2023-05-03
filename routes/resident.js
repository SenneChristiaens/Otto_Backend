const express = require("express");
const router = express.Router();
const eldercareController = require("../controllers/residents");

router.post("/create", eldercareController.create);


module.exports = router;
