const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    purchasedCourse: courseId
})

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdCourse: courseId
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    cretorId: adminId,
    creatorName: String
})

const purchaseSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        refs: users
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        refs: courses
    },
    adminId: {
        type: mongoose.Types.ObjectId,
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

