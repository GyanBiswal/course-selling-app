import { Router } from "express";
import { adminModel } from "../db.js";
import jwt from "jsonwebtoken";
const adminRouter = Router();
const JWT_ADMIN_PASSWORD = "12hy3637";


adminRouter.post('/signup', async function(req,res){
    const {email, password, firstName, lastName} = req.body; // TODO : adding zod validation
    // TODO : hash the password so plain text pw is not stored in the db

    // TODO : put it inside a try-catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastNAme: lastName
    })

    res.json({
        message : "sign up succeeded"
    })

})
adminRouter.post('/signin', async function(req,res){
    const { email, password} = req.body;

    //TODO: ideally pw should be hashed and hence you cant compare the hashed pw and db pw
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})
adminRouter.post('/course', function(req,res){
    res.json({
        message: "sign in endpoint"
    })
})
adminRouter.put('/course', function(req,res){
    res.json({
        message: "sign in endpoint"
    })
})
adminRouter.get('/course/bulk', function(req,res){
    res.json({
        message: "sign in endpoint admin"
    })
})


export {adminRouter};