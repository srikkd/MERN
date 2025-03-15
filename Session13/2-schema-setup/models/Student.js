const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    contact_no: Number,
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;