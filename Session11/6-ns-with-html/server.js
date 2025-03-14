const http = require("http");
const fs = require("fs");

const server = http.createServer((req, resp)=>{
    fs.readFile("index.html", "utf8", (err, data)=>{
        if(err){
            resp.write("<h1>Sorry, something went wrong</h1>");
            resp.end();
            return;
        }
        resp.write(data);
        resp.end();
        return;
    });
});

server.listen(4000, ()=>{
    console.log("Server is up and running.");
    
})