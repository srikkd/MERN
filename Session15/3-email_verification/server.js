const connectDB = require("./config/db");
connectDB();

const express = require("express");
const app = express();

app.use(express.json());

const apiRouter = require("./routes");
app.use("/api", apiRouter);

app.get("/", (req, resp)=>{
    resp.send("I am from server. How can i server you?");
});

app.get("*", (req, resp)=>{
    resp.send("404 Page Not Found");
});

app.listen(4000, ()=>{
    console.log("Server is up and running !!");
});