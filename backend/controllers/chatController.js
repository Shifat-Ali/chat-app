const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { response } = require("express");

const accessChat = asyncHandler(async (request, response) => {
  const { userId } = request.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return response.sendStatus(400);
  }

  if (userId === request.user._id) {
    console.log("Trying to create chat with itself");
    return response.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: request.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "-password",
  });

  if (isChat.length > 0) {
    response.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [request.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      response.status(200).send(FullChat);
    } catch (error) {
      response.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (request, response) => {
  try {
    var allChats = await Chat.find({
      users: { $elemMatch: { $eq: request.user._id } },
    })
      .populate("users", "-passowrd")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    allChats = await User.populate(allChats, {
      path: "latestMessage.sender",
      select: "-password",
    });

    response.status(200).send(allChats);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

const createdGroupChat = asyncHandler(async (request, response) => {
  if (!request.body.users || !request.body.name) {
    response.status(400);
    throw new Error("Please Fill all the Fields");
  }

  var users = JSON.parse(request.body.users);

  if (users.length < 2) {
    response.status(400);
    throw new Error("More than 2 users are required to form a group chat");
  }

  users.push(request.user);

  try {
    var groupChat = await Chat.create({
      chatName: request.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: request.user._id,
    });

    var fullGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password");

    fullGroupChat = await User.populate(fullGroupChat, {
      path: "latestMessage.sender",
      select: "-password",
    });

    response.status(201).json(fullGroupChat);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (request, response) => {
  const { chatId, newName } = request.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: newName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    response.status(400);
    response.send(updatedChat);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }

  return;
});

const removeFromGroup = asyncHandler(async (request, response) => {
  const { chatId, userId } = request.body;

  var chat = await Chat.findOne({ _id: chatId });

  if (!chat) {
    response.status(404);
    throw new Error("Chat Not Found");
  }

  if (
    JSON.stringify(request.user._id) !== JSON.stringify(chat.groupAdmin._id)
  ) {
    response.status(401);
    throw new Error("Only Group Admin can Add or Remove a member");
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    response.status(201).json(updatedChat);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

const addToGroup = asyncHandler(async (request, response) => {
  const { chatId, userId } = request.body;

  var chat = await Chat.findOne({ _id: chatId });

  if (!chat) {
    response.status(404);
    throw new Error("Chat Not Found");
  }

  if (JSON.stringify(request.user._id) !== JSON.stringify(chat.groupAdmin)) {
    response.status(401);
    throw new Error("Only Group Admin can Add pr Remove a member");
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    response.status(201).json(updatedChat);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createdGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
