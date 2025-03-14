const express = require("express");

const apiv1Router = require("./routes/v1");
const apiv2Router = require("./routes/v2");

const app = express();

app.use("/api/v1", apiv1Router);
app.use("/api/v2", apiv2Router);

app.get("/", (req, resp)=>{
    resp.send("I am from server. Pls tell how can i serve you.");
});

app.get("*", (req, resp)=>{
    resp.send("<h1>404 Page not Found</h1>");
});


app.listen(4000, ()=>{
    console.log("Server is up and runnin");
});