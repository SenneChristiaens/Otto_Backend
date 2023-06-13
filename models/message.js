const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  driver: String,
  message: String,
  timestamp: Date,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
