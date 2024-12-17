const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.USER_JWT_SECRET);
    if(decodedData){
        req.userId = decodedData.id;
        next();
    }
    else{
        res.json({
            message : "You are not signed in."
        })
    }
}

module.exports = {
    userMiddleware
}