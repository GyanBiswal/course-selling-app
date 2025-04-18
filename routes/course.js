const {Router} = require("express");

const courseRouter = Router;


courseRouter.get('/course/preview', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
courseRouter.post('/course/purchase', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})

modules.export = {
    courseRouter : courseRouter
}
