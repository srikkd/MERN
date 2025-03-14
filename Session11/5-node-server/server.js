const { log } = require("console");
const http = require("http");

const server = http.createServer((req, resp)=>{
    if(req.url === "/hello"){
        resp.write("<h1>I am from /hello route</h1>");
        // resp.end();
    }
    
    if(req.url === "/data"){
        resp.write("<h1>I am from /data route</h1>");
        resp.end();
        return;
    }
    
    resp.write("<h1>I am from server</h1>");
    resp.end();
});

server.listen(4000, ()=>{
    console.log("Server is up and running.");
    
});