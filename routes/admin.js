import { Router } from "express";
import { adminModel } from "../db.js";

const adminRouter = Router();


adminRouter.post('/signup', function(req,res){
    res.json({
        message: "sign up endpoint admin"
    })
})
adminRouter.post('/signin', function(req,res){
    res.json({
        message: "sign in endpoint"
    })
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