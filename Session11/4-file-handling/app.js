const fs = require("fs");

// fs.writeFile("newFile.txt", "Hi, this is NodeJS filehandling.", (err)=>{
//     if(err){
//         console.log(err);
        
//     }
//     console.log("File written.");   // UNDO doesn't work here: because these changes are done at OS level
// });

// fs.appendFile("newFile1.txt", "Hey, this is appendFile function in NodeJS trying to append to unexisting file.", (err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("File appended !!");    
// });

// fs.readFile("newFile.txt", "utf8", (err, resp)=>{
//     if(err){
//         console.log(err);        
//     }
//     console.log(resp);    
// })

// deleting a file
fs.unlink("newFile.txt", (err)=>{
    if(err){
        console.log(err);
    }
    console.log("File deleted !!");    
});