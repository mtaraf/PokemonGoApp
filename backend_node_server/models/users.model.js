const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
    },

    mode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // CreatedAt and UpdatedAt
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
