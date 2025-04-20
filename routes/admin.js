import { Router } from "express";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // For password hashing
const adminRouter = Router();
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../middleware/admin.js";

// Admin signup with password hashing
adminRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const admin = await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "Sign up succeeded",
            adminId: admin._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error signing up admin", error: error.message });
    }
});

// Admin signin with password comparison
adminRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({
                id: admin._id,
            }, process.env.JWT_ADMIN_PASSWORD);

            res.json({ token });
        } else {
            res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error: error.message });
    }
});

// Create course (admin only)
adminRouter.post('/course', adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            message: "Course created successfully", 
            courseId: course._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating course", error: error.message });
    }
});

// Update course (admin only)
adminRouter.put('/course', adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    try {
        const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId, creatorId: adminId },
            { title, description, imageUrl, price },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(403).json({ error: "You are not authorized to update this course or course not found." });
        }

        res.json({
            message: "Course updated successfully",
            courseId: updatedCourse._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error: error.message });
    }
});

// Get all courses for the admin
adminRouter.get('/course/bulk', adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    try {
        const courses = await courseModel.find({ creatorId: adminId });
        res.json({
            message: "Courses in bulk",
            courses
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
});

export { adminRouter };
