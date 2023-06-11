const Ride = require("../models/ride.js");
const Driver = require("../models/driver.js");
const Resident = require("../models/resident.js");

const jwt = require("jsonwebtoken");

const create = async (req, res) => {
    let ride = new Ride();
    ride.origin = req.body.origin;
    ride.originAddress = req.body.originaddress;
    ride.destination = req.body.destination;
    ride.destinationAddress = req.body.destinationaddress;

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
      if(Driver.exists({_id: req.data.uid})) {
        // const d = await Driver.findOne({_id: req.data.uid});
        const r = await Ride.find({ driver: await Driver.findOne({_id: req.data.uid}) });
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
    const r = await Ride.find({ driver: null });
    res.json({
        status: "success",
        rides: r,
    });
    
  };

  const accept = async (req, res) => {
    //   const d = await Driver.findOne({ _id: req.data.uid });
      if(Driver.exists({_id: req.data.uid})) {
        const r = await Ride.findOneAndUpdate({ _id: req.body.id },{ driver: await Driver.findOne({ _id: req.data.uid }) });
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
  