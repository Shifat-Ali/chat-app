const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(authenticate, allUser);
router.post("/login", authUser);

module.exports = router;
