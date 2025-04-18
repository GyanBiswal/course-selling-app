const express = require('express');

const app = express();


app.post('/user/signup', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
app.post('/user/signin', function(req,res){
    res.json({
        message: "sign in endpoint"
    })
})
app.get('/user/purchases', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
app.get('/user/courses', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})
app.post('/course/purchase', function(req,res){
    res.json({
        message: "sign up endpoint"
    })
})

app.listen(3000);