const Ride = require("../models/ride.js");
const Driver = require("../models/driver.js");
const Resident = require("../models/resident.js");

const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

const create = async (req, res) => {
    let ride = new Ride();
    ride.destination = req.body.destination;
    ride.origin = req.body.origin;
    // ride.driver = await Driver.findOne({ _id: req.body.driver });
    ride.driver = null;
    ride.timeStamp = new Date(req.body.timeStamp);
    
    //get all residents from id and push to array
    let residents = [];
    for (let i = 0; i < req.body.residents.length; i++) {
    ride.residents.push(await Resident.findOne({ _id: req.body.residents[i] }));
    }
    // save eldercare home to database
    ride.save().then(result => {
      res.json({
        status: "success",
        data: {
          msg: "Ride created successfully",
        },
      });
    });
  };

  const getRidesByDriver = async (req, res) => {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);
      if(Driver.exists({_id: decoded.uid})) {
        const d = await Driver.findOne({_id:decoded.uid});
        const r = await Ride.find({ driver: d });
        res.json({
          status: "success",
          rides: r,
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
  
  };

  const getAvailableRides = async (req, res) => {
    try {
        const r = await Ride.find({ driver: null });
        res.json({
          status: "success",
          rides: r,
        });
    } catch (error) {
      res.json({
        status: "error",
        message: "Invalid token: " + req.headers.authorization.split(' ')[1],
      });
    }
  
  };

  const accept = async (req, res) => {
    console.log(jwt.verify(req.headers.authorization.split(' ')[1], secret));
    try {
      decoded = jwt.verify(req.headers.authorization.split(' ')[1], secret);
      const d = await Driver.findOne({ _id: decoded.uid });
      if(Driver.exists({_id: decoded.uid})) {
        const r = await Ride.findOneAndUpdate({ _id: req.body.id },{ driver: d });
        res.json({
          status: "success",
          message: "Ride accepted"
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
  
  };

  const getById = async (req, res) => {
    try {
        const r = await Ride.find({ _id: req.body.id });
        res.json({
          status: "success",
          ride: r,
        });

    } catch (error) {
      res.json({
        status: "error",
        message: "Invalid ride id",
      });
    }
  
  };

  module.exports = {
    create,
    getRidesByDriver,
    getById,
    getAvailableRides,
    accept,
  };
  