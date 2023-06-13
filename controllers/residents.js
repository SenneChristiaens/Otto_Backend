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
  if (Resident.exists({ _id: id })) {
    const r = await Resident.find({ _id: id });
    res.json({
      resident: r,
    });
  } else {
    res.json({
      status: "error",
      message: "Resident not found",
    });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  if (Resident.exists({ _id: id })) {
    const r = await Resident.deleteOne({ _id: id });
    res.json({
      status: "success",
      message: "Resident deleted successfully",
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
  deleteById,
};
