const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({

    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    purchasedCourse: ObjectId
})

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdCourse: ObjectId
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    cretorId: ObjectId
})

const purchaseSchema = new Schema({
    userId: {
        type: ObjectId,
        refs: users
    },
    courseId: {
        type: ObjectId,
        refs: courses
    },
    adminId: {
        type: ObjectId,
        refs: admins
    }
})


const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}

