import { Router } from "express";
import { courseModel, purchaseModel } from "../db.js";  // Import models
import { userMiddleware } from "../middlewares/user.js";  // Import userMiddleware

const courseRouter = Router();

// Preview route: Get course details by course ID
courseRouter.get('/preview/:courseId', async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await courseModel.findById(courseId); // Fetch course details
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Send course details as response
        res.json({
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching course details" });
    }
});

// Purchase route: Users can purchase a course
courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    const { courseId } = req.body;

    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    try {
        // Check if the course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Create a new purchase record
        const purchase = await purchaseModel.create({
            userId: req.userId,  // Use the user ID from middleware
            courseId,
        });

        res.json({ message: "Course purchased successfully", purchase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error purchasing course", error });
    }
});

export { courseRouter };
