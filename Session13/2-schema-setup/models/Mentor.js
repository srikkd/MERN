const { timeStamp } = require("console");
const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    contact_no: Number,
    experience:{
        type: Number,
        default: 0,
    },
  }, 
  {
    timestamps: true
  }
);

const Mentor = mongoose.model("mentors", MentorSchema);

module.exports = Mentor;