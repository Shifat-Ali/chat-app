const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/generateToken");

const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password, profilePhoto } = request.body;

  if (!name || !email || !password) {
    response.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    response.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePhoto,
  });

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (user && password === user.password) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Either User doesn't exists or Password is Incorrect");
  }
});

const allUser = asyncHandler(async (request, response) => {
  const keyword = request.query.search
    ? {
        $or: [
          { name: { $regex: request.query.search, $options: "i" } },
          { email: { $regex: request.query.search, $options: "i" } },
        ],
      }
    : false;

  const users = await User.find(keyword).find({
    _id: { $ne: request.user._id },
  });

  response.send(users);
});

module.exports = { registerUser, authUser, allUser };
