const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authenticate = asyncHandler(async (request, response, next) => {
  let token;
  if (request.headers.authorization) {
    try {
      token = request.headers.authorization.split(" ")[1]; // [header]:[payload]:[signature]

      const decode = jwt.verify(token, "shifat");
      request.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      response.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    response.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { authenticate };
