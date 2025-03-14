const express = require("express");
const path = require("path");

const app = express();

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));

app.get("/", (req, resp)=>{
    const fileName = path.resolve(__dirname, "html", "index.html");
    resp.sendFile(fileName, (err, data)=>{
        if(err){
            console.log(err);
            resp.send("Something went wrong.");
            return;
        }
        return resp.send(data);
    });
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