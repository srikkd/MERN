const jwt = require("jsonwebtoken");

function validateToken(req, resp, next){
    const token = req.headers["authorization"];

    if(!token){
        return resp.status(400).json({msg: "BAD REQUEST: Token is missing"});
    }
    jwt.verify(token, "secretKey", (error, decoded)=>{
        if(error){
            console.log(error.message);
            resp.status(500).json({msg: "BAD REQUEST: Token is invalid"});
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = {validateToken}