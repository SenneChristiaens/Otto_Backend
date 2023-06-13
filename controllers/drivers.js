const Driver = require("../models/driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = async (req, res) => {
  let driver = await Driver.findById(req.data.uid);

  const validatePassword = await bcrypt.compare(
    req.body.password,
    driver.password
    );
  if (!validatePassword) {
    return res.json({
      status: "error",
      message: "Wrong password",
    });
  }

  if (req.body.newPassword == "") {
    return res.json({
      status: "error",
      message: "Password can't be empty",
    });
  }

  const salt = await bcrypt.genSalt(10);
  driver.password = await bcrypt.hash(req.body.newPassword, salt);

  driver.save().then((result) => {
    res.json({
      status: "success",
      data: {
        msg: "Password changed successfully",
      },
    });
  });
};

const create = async (req, res) => {
  let driver = new Driver();
  driver.givenName = req.body.givenName;
  driver.familyName = req.body.familyName;
  driver.dateOfBirth = req.body.dateOfBirth;
  driver.gender = req.body.gender;
  driver.address = req.body.address;
  driver.password = req.body.password;
  driver.email = req.body.email;
  driver.phone = req.body.phone;
  driver.carBrand = req.body.carBrand;
  driver.carModel = req.body.carModel;
  driver.carSeats = req.body.carSeats;
  driver.carColor = req.body.carColor;

  //check if password is empty
  if (driver.password == "") {
    return res.json({
      status: "error",
      message: "Password can't be empty",
    });
  }

  //check if password check is the same
  if (driver.password != req.body.passwordCheck) {
    return res.json({
      status: "error",
      message: "Passwords don't match",
    });
  }

    //check if user is 18y or older
  let birthDate = new Date(driver.dateOfBirth);
  if ((Date.now() - birthDate) / 31556952000 < 18) {
    return res.json({
      status: "error",
      message: "User must me 18years or over",
    });
  }

  //generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  //set user password to hashed password
  driver.password = await bcrypt.hash(driver.password, salt);

  // save user to database
  driver.save().then(result => {
    let token = jwt.sign(
      {
        uid: driver._id,
        name: driver.givenName + " " + driver.familyName,
      },
      process.env.TOKEN_SECRET
    );
    res.json({
      status: "success",
      data: {
        token: token,
      },
    });
  });
};

const login = async (req, res) => {
  const body = req.body;
  const driver = await Driver.findOne({ email: body.email });
  if (driver) {
    const validatePassword = await bcrypt.compare(
      body.password,
      driver.password
    );

    if (validatePassword) {
      let token = jwt.sign(
        {
          uid: driver._id,
          email: driver.email,
        },
        process.env.TOKEN_SECRET
      );

      res.json({
        status: "success",
        token: token,
        name: driver.givenName + " " + driver.familyName,
      });
    } else {
      res.json({
        status: "error",
        message: "Wachtwoord is niet correct",
      });
    }
  } else {
    res.json({
      status: "error",
      message: "Gebruiker niet gevonden",
    });
  }
};

const isAuth = async (req, res) => {
    const d = await Driver.findOne({ email: req.data.email });
    if(d._id == req.data.uid) {
      res.json({
        status: "success",
        message: "Driver is authorized"
      });
    } else {
      res.json({
        status: "error",
        message: "Driver is not authorized"
      });
    }
}

const getInfo = async (req, res) => {
    if(Driver.exists({_id: req.data.uid})) {
      const d = await Driver.findOne({ _id: req.data.uid });
      res.json({
        status: "success",
        name: d.givenName + " " + d.familyName,
        email: d.email,
        gender: d.gender,
        dateOfBirth: d.dateOfBirth,
        address: d.address,
        profilePicture: d.profilePicture,
      });
    } else {
      res.json({
        status: "error",
        message: "Driver not found"
      });
    }
}
const getById = async (req, res) => {
  if (Driver.exists({ _id: req.params.id })) {
    const d = await Driver.find({ _id: id });
    res.json({
      driver: d,
    });
  } else {
    res.json({
      status: "error",
      message: "Driver not found",
    });
  }
};

module.exports = {
  create,
  login,
  isAuth,
  getInfo,
  changePassword,
  getById,
};
