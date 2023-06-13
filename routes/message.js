const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages.js");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, messageController.create);
// router.put("/addmessage", jwt.authenticateToken, messageController.addMessage);


module.exports = router;