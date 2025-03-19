const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateToken } = require("../middlewares/verifyToken");

userRouter.get("/", (req, resp)=>{
    try {
        resp.json({msg:"user route is working."})
    } catch (error) {
        resp.status(500).json({msg: "Something went wrong", error});
    }
})

userRouter.get("/signup", async(req, resp)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        
        const savedUser = await user.save();
        resp.json({savedUser});
    } catch (error) {
        resp.status(500).json({msg: error.message});
    }
});

userRouter.get("/login", async(req, resp)=>{
    try {
        const user = await User.findOne( {email:req.body.email});
        if(!user){
            throw new Error("BAD REQUEST: User Not Found !!!");
        }
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            throw new Error("BAD REQUEST: Wrong Password !!!");
        }

        const token = jwt.sign(
            {userId: user._id},
            "secretKey"
        );

        resp.json({token});
    } catch (error) {
        resp.status(500).json({msg: error.message});
    }
})

userRouter.get("/data", validateToken, async(req, resp)=>{
    try {
        const user = await User.findById(req.userId).select("-password -createdAt -updatedAt");
        if(!user){
            resp.status(404).json({msg: "BAD REQUEST: User Not Found"});
        }
        resp.json({msg:"Fetched the user details", user});
    } catch (error) {
        resp.status(500).json({msg: error.message});
    }
})


module.exports = userRouter;