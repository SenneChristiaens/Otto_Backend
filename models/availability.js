const mongoose = require("mongoose");
const Driver = require("./driver");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  beginDate: Date,
  endDate: Date,
  driver: { type: Object, ref: Driver },
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
