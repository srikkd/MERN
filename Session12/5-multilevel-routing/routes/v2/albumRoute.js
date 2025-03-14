const router = require("express").Router();
const albums = require("../../data/albums");

router.get("/", (req, resp)=>{
    resp.send("Albums Route Working");
});

router.get("/all", (req, resp)=>{
    resp.send(albums);
});

router.get("/:id", (req, resp)=>{
    const data = albums.find((item) => item.id === Number(req.params.id));  //find gives only 1 JSON
    console.log(typeof data);   // this shows same for array and object: JS considers them same
    resp.json(data);
});

router.get("/user/:id", (req, resp)=>{
    const data = albums.filter((item) => item.userId === Number(req.params.id));    //filter gives an array of JSON
    console.log(typeof data);
    resp.json(data);
});

module.exports = router;