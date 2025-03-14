const express = require("express");

const app = express();

app.get("/", (req, resp)=>{
    resp.send("I am from server. Pls tell how can i serve you.");
});

app.get("/hello", (req, resp)=>{
    resp.send("This is hello route");
});

app.get("*", (req, resp)=>{
    resp.send("<h1>404 Page not Found</h1>");
});


app.listen(4000, ()=>{
    console.log("Server is up and runnin");
});