const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact_no: Number,
    dept: String,
    sports:[],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;