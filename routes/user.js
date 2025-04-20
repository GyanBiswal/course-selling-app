import { Router } from "express";
import { userModel } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";

const userRouter = Router();

userRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body; // TODO : adding zod validation
    // TODO : hash the password so plain text pw is not stored in the db

    // TODO : put it inside a try-catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "sign up succeeded"
    })

})
userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    //TODO: ideally pw should be hashed and hence you cant compare the hashed pw and db pw
    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})
userRouter.get('/purchases', function (req, res) {
    res.json({
        message: "sign up endpoint"
    })
})

export { userRouter };