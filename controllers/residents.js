const Resident = require("../models/resident.js");

const create = async (req, res) => {
    let resident = new Resident();
    resident.name = req.body.name;
    resident.dateOfBirth = req.body.dateOfBirth;
    resident.roomNumber = req.body.roomNumber;
    resident.emergencyContact = req.body.emergencyContact;
    resident.needs = req.body.needs;
    resident.eldercare = req.body.eldercare;
  
    // save eldercare home to database
    resident.save().then(result => {
      res.json({
        status: "success",
        data: {
          msg: "Resident '" + resident.name + "' created successfully",
        },
      });
    });
  };

  module.exports = {
    create,
  };
  