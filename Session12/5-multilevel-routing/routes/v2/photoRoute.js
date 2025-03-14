const router = require("express").Router();
const data = require("../../data/photos");

router.get("/", (req, resp)=>{
    resp.send("Photos Route Working");
});

router.get("/all", (req, resp)=>{
    resp.send(data);
});

router.get("/:id", (req, resp)=>{
    const data1 = data.find((item) => item.id === Number(req.params.id));  //find gives only 1 JSON
    resp.send(data1);
});

router.get("/user/:id", (req, resp)=>{
    const data1 = data.filter((item) => item.userId === Number(req.params.id));    //filter gives an array of JSON
    resp.json(data1);
});

module.exports = router;