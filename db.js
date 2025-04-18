import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId
console.log("connect to")
mongoose.connect("mongodb+srv://user1:qdhaZI3LcAfzex15@cluster0.2vk6bsv.mongodb.net/courseApp");

const userSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});
const adminSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});
const courseSchema = new Schema({
    title: String,
    description: String,
    price: String,
    imageUrl: String,
    courseId: ObjectId,
});
const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export {userModel, adminModel, courseModel, purchaseModel};