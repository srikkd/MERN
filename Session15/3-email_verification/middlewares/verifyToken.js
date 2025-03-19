const jwt = require("jsonwebtoken");

const secretKey = "secretKey";

function validateLoginToken(req, resp, next){
    const token = req.headers["authorization"];

    if(!token){
        return resp.status(400).json({msg: "BAD REQUEST: Token is missing"});
    }
    jwt.verify(token, secretKey, (error, decoded)=>{
        if(error){
            console.log(error.message);
            resp.status(401).json({msg: "BAD REQUEST: Token is invalid"});
        }

        req.userId = decoded.userId;
        next();
    });
}

function validateEmailAuthToken(req, resp, next){
    const token = req.params.token;
    if(!token){
        return resp.status(400).json({msg: "Incomplete URL without token"});
    }
    jwt.verify(token, secretKey, (error, decoded)=>{
        if(error){
            console.log(error.message);
            resp.status(401).json({msg: "Invalid Token in URL"});
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = {secretKey, validateLoginToken, validateEmailAuthToken}