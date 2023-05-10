const express = require("express");
const router = express.Router();
const eldercareController = require("../controllers/eldercares");

router.post("/create", eldercareController.create);
router.post("/login", eldercareController.login);
router.post("/auth", eldercareController.isAuth);
router.post("/getresidents", eldercareController.getResidents);


module.exports = router;