const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chats.js");
const jwt = require('../middleware/jwt.js');

router.post("/create", jwt.authenticateToken, chatController.create);
router.put("/addmessage/:id", jwt.authenticateToken, chatController.addMessage);
router.get("/", jwt.authenticateToken, chatController.getByUser);


module.exports = router;