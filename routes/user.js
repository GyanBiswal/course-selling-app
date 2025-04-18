import { Router } from "express";

const userRouter = Router();

userRouter.post('/signup', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
userRouter.post('/signin', function(req,res){
    res.json({
        message: "sign in endpoint"
    })
})
userRouter.get('/purchases', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})

export { userRouter };