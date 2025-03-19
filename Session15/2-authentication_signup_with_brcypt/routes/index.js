const Router = require("express").Router();

const userRouter = require("./userRouter");

Router.use("/user", userRouter);

module.exports = Router;