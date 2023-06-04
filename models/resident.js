const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const residentSchema = new Schema({
  name: String,
  dateOfBirth: String,
  roomNumber: String,
  emergencyContact: String,
  needs: [String],
  eldercare: String,
});

const Resident = mongoose.model("residents", residentSchema);

module.exports = Resident;
