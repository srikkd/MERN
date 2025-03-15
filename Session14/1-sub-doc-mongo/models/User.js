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
    experience:{
      type: Number,
      default: 0,
    },
    dept: String,
    sports:[
      new mongoose.Schema({
        name:String,
        coachName:String
      }, 
      {timestamps: true}, )
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;