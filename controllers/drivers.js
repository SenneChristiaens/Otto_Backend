const Driver = require("../models/driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

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

  if (driver.password == "") {
    return res.json({
      status: "error",
      message: "Password can't be empty",
    });
  }

  //generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  //set user password to hashed password
  driver.password = await bcrypt.hash(driver.password, salt);

  // save eldercare home to database
  driver.save().then(result => {
    let token = jwt.sign(
      {
        uid: driver._id,
        name: driver.givenName + " " + driver.familyName,
      },
      secret
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
        process.env.DB_SECRET
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

module.exports = {
  create,
  login,
};
