import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from './routes/admin.js';
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is working 👋");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000); 
    console.log("Listening on port 3000");
}

main();