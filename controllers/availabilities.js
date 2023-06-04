const Availability = require("../models/availability.js");
const Driver = require("../models/driver.js");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
    let availability = new Availability();
    availability.beginDate = new Date(req.body.beginDate);
    availability.endDate = new Date(req.body.endDate);
    availability.driver = await Driver.findOne({ _id: req.data.uid });
    
    // save eldercare home to database
    availability.save().then(result => {
      res.json({
        status: "success",
        data: {
          msg: "Availability created successfully",
        },
      });
    });
  };

  const getAvailabilitiesByDriver = async (req, res) => {
      if(Driver.exists({_id: req.data.uid})) {
        const d = await Driver.findOne({_id: req.data.uid});
        const r = await Availability.find({ driver: d });
        res.json({
          status: "success",
          availabilities: r,
        });
      } else {
        res.json({
          status: "error",
          message: "Driver not found"
        });
      }
  }

  const getById = async (req, res) => {
    try {
        const r = await Availability.find({ _id: req.body.id });
        res.json({
          status: "success",
          availability: r,
        });

    } catch (error) {
      res.json({
        status: "error",
        message: "Invalid availability id",
      });
    }
  }

  module.exports = {
    create,
    getAvailabilitiesByDriver,
    getById,
  };
  