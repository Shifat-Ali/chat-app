const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shifat", { expiresIn: "30d" });
};

module.exports = { generateToken };
