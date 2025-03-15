const studentRouter = require("express").Router();

const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

studentRouter.get("/", (req, resp)=>{
    resp.send("Student Route is working")
});

studentRouter.post("/add", async(req, resp)=>{
    try {
        const student = await Student.create(req.body);
        // const student = await new Student(req.body);

        const mentor = await Mentor.findByIdAndUpdate(
            req.body.mentor,
            {
                $push:{students:student._id}
            },
            {new: true},
        ).populate("students", "name email");

        if(!mentor){
            // resp.status(404).json({message: "Invalid MentorId"});
            throw new Error("BAD REQUEST: Invalid MentorId !!!")
        }
        // await student.save();
        resp.json({student, mentor});
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

studentRouter.get("/all", async(req, resp)=>{
    try {
        const students = await Student.find().populate("mentors", "-students -createdAt -updatedAt");
        resp.json(students);
    } catch (error) {
        resp.status(500).json(error.message);
    }
})

module.exports = studentRouter;