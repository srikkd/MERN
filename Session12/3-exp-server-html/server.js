const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use("/photos", express.static("./images"));
app.use("/css", express.static("css"));

app.get("/", (req, resp)=>{    
    resp.sendFile(path.resolve(__dirname,"html","index.html"));
});

app.post("/add", (req, resp)=>{
    console.log("Data received");
    console.log(req.body);

    // resp.send("The result of addition: "+ req.body.num1+req.body.num2);     // it will not work since reqBody contains string values
    const num1 = (Number)(req.body.num1);
    const num2 = (Number)(req.body.num2);
    resp.send(`The result of addition: ${num1+num2}`);
});




app.listen(4000, ()=>{
    console.log("Server is up and runnin");
    // console.log(path.resolve(__dirname));
    // console.log(path.resolve(__filename));
    console.log();
});