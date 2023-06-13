const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./message.js");
const Driver = require("./driver.js");
const Eldercare = require("./eldercare.js");

const chatSchema = new Schema({
  messages: [ { type: Object, ref: Message } ],
  driver: { type: Object, ref: Driver },
  eldercare: { type: Object, ref: Eldercare },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
