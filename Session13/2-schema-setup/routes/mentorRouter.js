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
        console.log(error);
        resp.json(error);
    }
});

module.exports = mentorRouter;