const { Router } = require("express");
const { userMiddleware } = require("../middlewares/userAuth");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    // payment verification logic goes here right now not checking for payment

    try {
        const response = await purchaseModel.create({
            userId,
            courseId
        })

        res.status(200).json({
            message: "Purchase Successfull",
            purchaseId: response._id
        })

    } catch(error) {
        console.log(error);
        res.json({
            message: "Purchase Failed"
        })
    }
})

courseRouter.get("/preview", async (req, res) => {
    try {
        const courses = await courseModel.find({});

        res.status(200).json({
           message: "All courses are",
           courses 
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


module.exports = {
    courseRouter
}


