const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://saurabh:saurabh@cluster0.qzal9ta.mongodb.net/test-db?retryWrites=true&w=majority&appName=Cluster0");
const User = mongoose.model("users", {
    name: String,
    age: Number,
    email: String
});

// const user = new User({name1:"Saurabh"});
// // user.save();
// const data = user.save();
// console.log(data);

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, resp)=>{
    resp.send("I am from server. How can i serve you?");
});

app.post("/add", async(req, resp)=>{
    // console.log(req.body);
    const user = new User(req.body);
    const data = await user.save(); //w/o async .. await, data is empty json: pending-state promise
    resp.send(data);
});

app.get("/all", async(req, resp)=>{
    const users = await User.find();    
    resp.send(users);
});

app.put("/:id", async(req, resp)=>{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    });
    resp.send(updatedUser);
});

app.delete("/:id", async(req, resp)=>{
    const deletedData = await User.findByIdAndDelete(req.params.id);
    resp.json({message: "Following data deleted"}, deletedData);
});

app.listen(4000, ()=>{
    console.log("Server is up and running.");
});


