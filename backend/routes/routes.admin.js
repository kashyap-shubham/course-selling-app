const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middlewares/adminAuth");
const jwt = require("jsonwebtoken");
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    try {
        const existingAdmin = await adminModel.findOne({email});
        if (existingAdmin) {
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User Signed up Successfully"
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error Signining Up"
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await adminModel.findOne({email});
        if (!admin) {
            return res.status(400).json({
                message: "Invalid Email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json(400).json({
                message: "Invalid Email or password"
            })
        }

        const token = jwt.sign({
            id: admin._id.toString()
        }, process.env.ADMIN_JWT, { expiresIn: "1d"})


        res.status(200).json({
            message: "Login Successful",
            admin: {
                id: admin._id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                token: token 
            }
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

adminRouter.post("/createCourses", adminMiddleware, async (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    
    const adminId = req.adminId;
    console.log(adminId)
    try {
        const response = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        })
        
        res.status(200).json({
            message: "Course created Successfully",
            courseId: response._id
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

adminRouter.put("/updateCourse", adminMiddleware, async (req, res) => {
    const { title, description, imageUrl, price, courseId } = req.body;
    const adminId = req.adminId;

    try {
        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        }, {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
        })

        res.status(200).json({
            message: "Course updated successfully",
            courseId: course._id
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

adminRouter.get("/createdCourses", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    try {
        const courses = await courseModel.find({
            creatorId: adminId
        })

        res.status(200).json({
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
    adminRouter
}
