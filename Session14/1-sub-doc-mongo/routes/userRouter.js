const userRouter = require("express").Router();

const User = require("../models/User");

userRouter.get("/", (req, resp)=>{
    resp.send("User Route is working")
});

userRouter.post("/add", async(req, resp)=>{
    try {
        const user = await User.create(req.body);
        resp.json(user);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

userRouter.get("/all", async(req, resp)=>{
    try {
        const users = await User.find();
        resp.json(users);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

userRouter.get("/filter", async(req, resp)=>{
    try {
        const data = await User.find({age:{$gt:18}}).select("name email age").sort({age:"desc"});
        resp.json(data);
    } catch (error) {
        resp.status(500).json(error.message);
    }
})

userRouter.put("/add-sports/:id", async(req, resp)=>{
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push:{sports:req.body}
            },
            {new: true},
        );

        if(!user){
            return resp.status(404).json({ message: "User not found" });
        }

        resp.json(user);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

userRouter.put("/remove-sports/:userId", async(req, resp)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.userId);
        if(!user){
            return resp.status(404).json({ message: "User not found" });
        }

        const sport = await user.sports.id(req.body.id);    //accessing array-member inside Array_sub-doc using .id()
        if(!sport){
            return resp.status(404).json({ message: "Sport not found" });
        }

        await sport.deleteOne();    //sub-doc function: deleting that sub-doc
        const data = await user.save(); //data = updated User

        resp.json(user);
    } catch (error) {
        resp.status(500).json(error.message);
    }
});

module.exports = userRouter;