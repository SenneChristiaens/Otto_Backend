const mongoose = require("mongoose");
const Driver = require("./driver");
const Resident = require("./resident");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  origin: String,
  destination: [Number],
  driver: { type: Object, ref: Driver},
  residents: [{ type: Object, ref: Resident}],
  timeStamp: Date
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
