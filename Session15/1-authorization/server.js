const express = require("express");
const app = express();
app.use(express.json());

const users = require("./users.json");
const cars = require("./cars.json");

const jwt = require("jsonwebtoken");
const secretKey = "108#!";

app.get("/", (req, resp)=>{
    resp.write("I am from server. Pls tell how can i serve you.");
    resp.send();
});

app.post("/login", (req, resp)=>{
    try {
        const user = users.find((user)=>user.username === req.body.username);
        if(!user){
            throw new Error("BAD REQUEST: Invalid User or User NOT_FOUND !!");
        }

        if(user.password !== req.body.password){
            throw new Error("BAD REQUEST: Incorrect Password !!");
        }

        const token = jwt.sign(
            {userId: user.id},
            secretKey,
        );

        resp.json({token});
    } catch (error) {
        resp.status(500).json({"msg": error.message});
    }
});

function validateToken(req, resp, next){
    const token = req.headers["authorization"];
    if(!token){
        resp.status(406).json({"msg": "BAD REQUEST: Token is Missing !!"});
        //if we throw new Error here, it will not go to try...catch of next()
    }

    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){            
            console.log({msg: err.message});            
            return resp.status(400).json({"msg": "BAD REQUEST: Token is Invalid !!"});
        }

        req.userId = decoded.userId;
        return next();
    });

    // next();
}

app.get("/cars", validateToken, (req, resp)=>{
    try {
        const user = users.find((user)=>user.id === req.userId);

        if(!user){
            throw new Error("Something went wrong: User NOT_FOUND !!");
        }

        const data = cars.filter((car)=>car.userId === user.id);
        resp.json(data);
    } catch (error) {
        resp.status(500).json({"msg": error.message});
    }
})

app.listen(4000, ()=>{
    console.log("Server is up and running !!");
    
})