const Message = require("../models/message.js");

const create = async (req, res) => {
  let message = new Message();
  message.sender = req.data.uid;
  message.text = req.body.text;
  message.timestamp = Date.now();

  message.save().then((result) => {
    res.json({
      status: "success",
      data: {
        msg: "Message created successfully",
        id: result._id,
      },
    });
  });
};

const edit = async (req, res) => {
  if (Chat.exists({ _id: req.params.id })) {
    const c = Chat.findOne({ _id: req.params.id });
    m = c.messages;
    m.push(req.body.message);
    await Chat.findOneAndUpdate({ _id: req.params.id }, { messages: m});
    res.json({
      status: "success",
      message: "Message added successfully",
    });
  } else {
    res.json({
      status: "error",
      message: "Chat not found",
    });
  }
};

module.exports = {
  create,
};
