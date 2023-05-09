const Ride = require("../models/ride");
const Driver = require("../models/driver");
const Resident = require("../models/resident");

const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

const create = async (req, res) => {
    let ride = new Ride();
    ride.startlat = req.body.startlat;
    ride.startlng = req.body.startlng;
    ride.destination = req.body.destination;
    ride.driver = await Driver.findOne({ _id: req.body.driver });
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
      const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.DB_SECRET);
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
  
  }

  module.exports = {
    create,
    getRidesByDriver,
  };
  