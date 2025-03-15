const studentRouter = require("express").Router();

const Student = require("../models/Student");

studentRouter.get("/", (req, resp)=>{
    resp.send("Student Route is working")
});

studentRouter.post("/add", async(req, resp)=>{
    try {
        const student = await Student.create(req.body);
        resp.json(student);
    } catch (error) {
        resp.json(error);
    }
});

module.exports = studentRouter;