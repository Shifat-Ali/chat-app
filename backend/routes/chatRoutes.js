const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createdGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChats);
router.route("/group").post(authenticate, createdGroupChat);
router.route("/rename").put(authenticate, renameGroup);
router.route("/group-remove").put(authenticate, removeFromGroup);
router.route("/group-add").put(authenticate, addToGroup);

module.exports = router;
