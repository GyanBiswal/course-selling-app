import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config,js";

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if(decoded){
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

export {userMiddleware};