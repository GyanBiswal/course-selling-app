import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from './routes/admin.js';



app.get("/", (req, res) => {
    res.send("Server is working 👋");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://user1:qdhaZI3LcAfzex15@cluster0.2vk6bsv.mongodb.net/courseApp");
    app.listen(3000); 
    console.log("Listening on port 3000");
}

main();