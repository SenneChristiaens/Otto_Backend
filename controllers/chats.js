const Chat = require("../models/chat.js");
const Message = require("../models/message.js");

const create = async (req, res) => {
  let chat = new Chat();
  chat.driver = req.data.uid;
  chat.eldercare = req.body.eldercare;

  chat.save().then((result) => {
    res.json({
      status: "success",
      data: {
        msg: "Chat created successfully",
      },
    });
  });
};

const addMessage = async (req, res) => {
  if (Chat.exists({ _id: req.params.id })) {
    const c = await Chat.findOne({ _id: req.params.id });
    let m = c.messages;
    let newm = await Message.findOne({ _id: req.body.message });
    m.push(newm);
    await Chat.findOneAndUpdate({ _id: req.params.id }, { messages: m });
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

const getByUser = async (req, res) => {
  await Chat.find()
    .or([{ driver: req.data.uid }, { eldercare: req.data.uid }])
    .then((chats) => {
      res.json({
        status: "success",
        chats: chats,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  create,
  addMessage,
  getByUser,
};
