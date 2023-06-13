const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./message.js");

const chatSchema = new Schema({
  messages: [ { type: Object, ref: Message } ],
  driver: String,
  eldercare: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
