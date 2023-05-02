const express = require("express");
const router = express.Router();
const eldercareController = require("../controllers/eldercare");

router.post("/create", eldercareController.create);
// router.post("/login", eldercareController.login);


module.exports = router;
