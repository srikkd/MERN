const mentorRouter = require("express").Router();

const Mentor = require("../models/Mentor");

mentorRouter.get("/", (req, resp)=>{
    resp.send("Mentor route is working");
})

mentorRouter.post("/add", async(req, resp)=>{
    try {
        const data = await Mentor.create(req.body);
        resp.send(data);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

mentorRouter.get("/all", async(req, resp)=>{
    try {
        const mentors = await Mentor.find().populate("students", "name email")
                                           .select("-createdAt -updatedAt");
        resp.json(mentors);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

module.exports = mentorRouter;