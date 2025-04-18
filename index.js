import express from 'express';
const app = express();
import { userRouter } from "./routes/user.js";
import { courseRouter } from "./routes/course.js";
import { adminRouter } from './routes/admin.js';


app.get("/", (req, res) => {
    res.send("Server is working 👋");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


app.listen(3000);