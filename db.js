import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] 
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
    creatorId: ObjectId,
});
const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export {userModel, adminModel, courseModel, purchaseModel};