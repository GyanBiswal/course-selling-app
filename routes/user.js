import { Router } from "express";
import { userModel, courseModel, purchaseModel } from "../db.js";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/user.js";

const userRouter = Router();

// User Signup
userRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    });

    res.json({ message: "Sign up succeeded" });
});

// User Signin
userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });

    if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_PASSWORD);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// Get all available courses
userRouter.get('/courses', async function (req, res) {
    const courses = await courseModel.find({});
    res.json({ courses });
});

// Purchase a course
userRouter.post('/courses/:courseId', userMiddleware, async function (req, res) {
    const course = await courseModel.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    try {
        // Update the user's purchasedCourses array to add the course ID
        const updatedUser = await userModel.updateOne(
            { _id: req.userId },
            { $addToSet: { purchasedCourses: course._id } } // This prevents duplicates
        );

        // ALSO: Save a record in the purchases collection
        await purchaseModel.create({
            userId: req.userId,
            courseId: course._id
        });

        // Log the course and user info
        console.log("Course to purchase:", course);
        console.log("User ID:", req.userId);
        res.json({ message: "Course purchased successfully" });
    } catch (error) {
        console.error('Error purchasing course:', error);
        res.status(500).json({ message: "Error purchasing course", error });
    }
});

// Get purchased courses
userRouter.get('/purchasedCourses', userMiddleware, async function (req, res) {
    const user = await userModel.findById(req.userId).populate('purchasedCourses');
    console.log('Purchased Courses:', user.purchasedCourses);
    res.json({ purchasedCourses: user.purchasedCourses });
});

export { userRouter };
