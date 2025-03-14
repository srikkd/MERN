const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, resp)=>{
    const parsedUrlObject = url.parse(req.url, true);

    // console.log(parsedUrlObject);
    
    const fileName = "." + parsedUrlObject.pathname + ".html";

    fs.readFile(fileName, "utf8", (err, data)=>{
        if(err){
            console.log(err);
            resp.write("<h1>404 Page not found !!</h1>");
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
});