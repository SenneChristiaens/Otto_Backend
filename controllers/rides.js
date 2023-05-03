const Ride = require("../models/ride");
const Driver = require("../models/driver");
const Resident = require("../models/resident");

const create = async (req, res) => {
    let ride = new Ride();
    ride.startlat = req.body.startlat;
    ride.startlng = req.body.startlng;
    ride.endlat = req.body.endlat;
    ride.endlng = req.body.endlng;
    ride.driver = await Driver.findOne({ _id: req.body.driver });
    ride.timeStamp = new Date(req.body.timeStamp);
    
    //get all residents from id and push to array
    req.body.residents.forEach(async resident => {
        let r = await Resident.findOne({ _id: resident});
        ride.residents.push(r);
    });
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

  module.exports = {
    create,
  };
  