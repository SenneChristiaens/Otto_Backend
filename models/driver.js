const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  givenName: String,
  familyName: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  profilePicture: String,
  password: String,
  email: String,
  phoneNumber: String,
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;