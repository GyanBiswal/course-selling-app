import { Router } from "express";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
const adminRouter = Router();
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../middleware/admin.js";


adminRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body; // TODO : adding zod validation
    // TODO : hash the password so plain text pw is not stored in the db

    // TODO : put it inside a try-catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastNAme: lastName
    })

    res.json({
        message: "sign up succeeded"
    })

})
adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    //TODO: ideally pw should be hashed and hence you cant compare the hashed pw and db pw
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if (admin) {
        const token = jwt.sign({
            id: admin._id,
        }, process.env.JWT_ADMIN_PASSWORD);

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
adminRouter.post('/course', adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl, 
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created successfully", 
        courseId: course._id
    })
})
adminRouter.put('/course', adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const {title, description, imageUrl, price, courseId} = req.body;

    const courses = await courseModel.update({
            // just to make sure two diiferent admins can only update their respective courses
            // adminA cannot change adminB courses and vice versa.
            _id: courseId,
            creatorId: adminId
        },
        {
            title: title,
            description: description,
            imageUrl: imageUrl, 
            price: price,
        }
    )

    res.json({
        message: "Course updated successfully", 
        courseId: courses._id
    })
})
adminRouter.get('/course/bulk', adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    },
    {
        title: title,
        description: description,
        imageUrl: imageUrl, 
        price: price,
    }
)

res.json({
    message: "Courses in bulk", 
    courses
})
})


export { adminRouter };