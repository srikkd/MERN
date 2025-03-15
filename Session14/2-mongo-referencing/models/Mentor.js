const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const MentorSchema = new mongoose.Schema({
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
    students:[
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
  }, 
  {
    timestamps: true
  }
);

const Mentor = mongoose.model("mentors", MentorSchema);

module.exports = Mentor;