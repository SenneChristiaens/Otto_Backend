const mongoose = require("mongoose");
const Driver = require("./driver");
const Resident = require("./resident");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  startlat: String,
  startlng: String,
  endlat: String,
  endlng: String,
  driver: { type: Object, ref: Driver},
  residents: [{type: Object}],
  timeStamp: Date

});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
