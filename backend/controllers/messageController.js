const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const sendMessage = asyncHandler(async (request, response) => {
  const { content, chatId } = request.body;

  if (!content || !chatId) {
    console.log("Invalid data sent by user");
    return response.sendStatus(400);
  }

  let newMessage = {
    sender: request.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let msg = await Message.create(newMessage);

    msg = await msg.populate("sender", "name profilePhoto");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "-password",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: msg,
    });

    response.json(msg);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});
const allMessages = asyncHandler(async (request, response) => {
  try {
    const messages = await Message.find({
      chat: request.params.chatId,
    })
      .populate("sender", "-password")
      .populate("chat");
    response.json(messages);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
