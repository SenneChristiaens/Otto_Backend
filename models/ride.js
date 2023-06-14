const mongoose = require("mongoose");
const Driver = require("./driver");
const Resident = require("./resident");
const Eldercare = require("./eldercare");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  origin: [Number],
  destination: [Number],
  originAddress: String,
  destinationAddress: String,
  driver: { type: Object, ref: Driver},
  residents: [{ type: Object, ref: Resident}],
  eldercare: { type: Object, ref: Eldercare},
  timeStamp: Date
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
