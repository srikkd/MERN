const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true
    },
    contact_no: Number,
    dept: String,
    mentor:{
      type: mongoose.Types.ObjectId,
      ref: "mentors"
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;