const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  messages: [ String ],
  driver: String,
  eldercare: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
