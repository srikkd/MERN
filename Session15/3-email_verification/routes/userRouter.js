const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {validateLoginToken, validateEmailAuthToken, secretKey } = require("../middlewares/verifyToken");
const nodemailer = require("nodemailer");

userRouter.get("/", (req, resp)=>{
    try {
        resp.json({msg:"user route is working."})
    } catch (error) {
        resp.status(500).json({msg: "Something went wrong", error});
    }
})
const email = "saurabhgupta25dec@gmail.com";
const pwd = "mikc octe ncit ydgk";

userRouter.post("/signup", async(req, resp)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {userId: user._id},
            secretKey,
            {expiresIn: 60*60*24}
        );
        const emailVerificationUrl = `"http://localhost:4000/api/user/verify/${token}"`;

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:email,
                pass:pwd,
            }
        });

        const info = await transporter.sendMail({
            from: "User Info Private Limited<saurabhgupta25dec@gmail.com>",
            to: req.body.email,
            subject: "Email Verification after sign-up",
            html: `
                <h1>Hi ${req.body.name}, You have signed up successfully.</h1>
                <h3>Pls complete the email-verification step by clicking on the following link.</h2>
                <a href=${emailVerificationUrl}>Verify Email</a>            
            `
        })
        console.log(info);
        
        resp.json({msg: "User sign-up successful. Pls complete email verification within 24 hrs.", user});
    } catch (error) {
        resp.status(500).json({msg: error.message});
    }
});

userRouter.get("/verify/:token", validateEmailAuthToken, async(req, resp)=>{
    try {
        const user = await User.findById(req.userId);
        if(!user){
            resp.status(404).json({msg: "User not found/ Invalid Token in URL"})
        }
        // user.verified = true; // this will not reflect in DB
        const verifiedUser = await User.findByIdAndUpdate(
            user._id, 
            {verified: true},
            {new:true},
        );
        
        resp.json({msg: "Email Verified", verifiedUser});
    } catch (error) {
        resp.status(500).json({msg:error.message});
    }
});


userRouter.post("/login", async(req, resp)=>{
    try {
        const user = await User.findOne( {email:req.body.email});
        if(!user){
            resp.status(404).json({msg: "User Not Found !!!: Pls try again with correct username/email."});
        }
        if(user.verified === false){
            resp.status(400).json({msg: "Email verification is pending. Pls verify your account."})
        }
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            resp.status(401).json({msg: "BAD REQUEST: Wrong Password !!!"});
        }

        const token = jwt.sign(
            {userId: user._id},
            secretKey
        );

        resp.json({msg:"Login successful", token});
    } catch (error) {
        resp.status(500).json({msg: error.message});
    }
})

userRouter.get("/data", validateLoginToken, async(req, resp)=>{
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