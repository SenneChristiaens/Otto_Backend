const mongoose = require("mongoose");
const Resident = require("./resident");
const Schema = mongoose.Schema;

const eldercareSchema = new Schema({
  name: String,
  profilepicture: String,
  email: String,
  password: String,
  address: String,
  phone: String,
});

const Eldercare = mongoose.model("Eldercare", eldercareSchema);

module.exports = Eldercare;
