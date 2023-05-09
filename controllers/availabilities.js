const Availability = require("../models/availability.js");
const Driver = require("../models/driver.js");

const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

const create = async (req, res) => {
    let availability = new Availability();
    availability.beginDate = new Date(req.body.beginDate);
    availability.endDate = new Date(req.body.endDate);
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.DB_SECRET);
    availability.driver = await Driver.findOne({ _id: decoded.uid });
    
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
    try {
      const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.DB_SECRET);
      if(Driver.exists({_id: decoded.uid})) {
        const d = await Driver.findOne({_id:decoded.uid});
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
    } catch (error) {
      res.json({
        status: "error",
        message: "Invalid token",
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
  