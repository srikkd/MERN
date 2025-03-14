const express = require("express");

const app = express();

app.get("", (req, resp)=>{
    resp.send("This is GET request.");
});
app.post("", (req, resp)=>{
    resp.send("This is POST request.");
});
app.put("", (req, resp)=>{
    resp.send("This is PUT request.");
});
app.patch("", (req, resp)=>{
    resp.send("This is PATCH request.");
});
app.delete("", (req, resp)=>{
    resp.send("This is DELETE request.");
});

app.listen(4000, ()=>{
    console.log("Server is up and running.");    
});