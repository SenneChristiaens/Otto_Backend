const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  text: String,
  timestamp: Date,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
