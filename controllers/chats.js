const Chat = require("../models/chat.js");


const create = async (req, res) => {
    let chat = new Chat();
    chat.driver = req.data.driver;
    chat.eldercare = req.body.eldercare;

    chat.save().then(result => {
      res.json({
        status: "success",
        data: {
          msg: "Chat created successfully",
        },
      });
    });
};


  module.exports = {
    create,
  };
  