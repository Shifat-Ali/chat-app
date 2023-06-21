const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F21%2F21104.png&tbnid=P6AlQsrs5ks3RM&vet=12ahUKEwjb-b6XmcL_AhUrL7cAHdjBC84QMygCegUIARDrAQ..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-picture_21104&docid=nKbZ7-T8tpkWLM&w=512&h=512&q=user%20picture&ved=2ahUKEwjb-b6XmcL_AhUrL7cAHdjBC84QMygCegUIARDrAQ",
    },
  },
  {
    timestapms: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
