const Eldercare = require("../models/eldercare");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

const create = async (req, res) => {
  let eldercare = new Eldercare();
  eldercare.name = req.body.name;
  eldercare.email = req.body.email;
  eldercare.password = req.body.password;
  eldercare.address = req.body.address;
  eldercare.phone = req.body.phone;

  if (eldercare.password == "") {
    return res.json({
      status: "error",
      message: "Password can't be empty",
    });
  }

  //generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  //set user password to hashed password
  eldercare.password = await bcrypt.hash(eldercare.password, salt);

  // save eldercare home to database
  eldercare.save().then(result => {
    let token = jwt.sign(
      {
        uid: eldercare._id,
        nickname: eldercare.nickname,
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
  const eldercare = await Eldercare.findOne({ email: body.email });
  if (eldercare) {
    const validatePassword = await bcrypt.compare(
      body.password,
      eldercare.password
    );

    if (validatePassword) {
      let token = jwt.sign(
        {
          uid: eldercare._id,
          email: eldercare.email,
        },
        process.env.DB_SECRET
      );

      res.json({
        status: "success",
        token: token,
        name: eldercare.name,
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
