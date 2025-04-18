import { Router } from "express";

const courseRouter = Router();


courseRouter.get('/preview', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
courseRouter.post('/purchase', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})

export { courseRouter };
