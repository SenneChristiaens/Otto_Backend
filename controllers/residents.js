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
  resident.save().then((result) => {
    res.json({
      status: "success",
      data: {
        msg: "Resident '" + resident.name + "' created successfully",
      },
    });
  });
};

const edit = async (req, res) => {
  let resident = await Resident.findById(req.params.id);
  resident.name = req.body.name;
  resident.dateOfBirth = req.body.dateOfBirth;
  resident.roomNumber = req.body.roomNumber;
  resident.emergencyContact = req.body.emergencyContact;
  resident.needs = req.body.needs;
  resident.eldercare = req.body.eldercare;

  resident.save().then((result) => {
    res.json({
      status: "success",
      data: {
        msg: "Resident '" + resident.name + "' edited successfully",
      },
    });
  });
};

const getById = async (req, res) => {
  const id = req.params.id;
  if (Eldercare.exists({ _id: req.data.uid })) {
    const e = await Resident.find({ _id: id });
    res.json({
      residents: e,
    });
  } else {
    res.json({
      status: "error",
      message: "Resident not found",
    });
  }
};

module.exports = {
  create,
  edit,
  getById,
};
