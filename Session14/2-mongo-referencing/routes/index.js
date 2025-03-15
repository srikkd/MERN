const Router = require("express").Router();

const mentorRouter = require("./mentorRouter");
const studentRouter = require("./studentRouter");

Router.use("/mentor", mentorRouter);
Router.use("/student", studentRouter);

module.exports = Router;