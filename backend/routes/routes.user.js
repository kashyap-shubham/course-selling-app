const { Router } = require("express");
const { purchaseModel, courseModel, userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const { userMiddleware } = require("../middlewares/userAuth");


userRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    console.log(req.body);

    try {
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await userModel.create({
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

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or password"
            })
        }

        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.USER_JWT, { expiresIn: "1d"})


        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
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

userRouter.get("/purchased", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        
        const purchases = await purchaseModel.find({userId});

        const courseIds = purchases.map(p => p.courseId);

        const courseData = await courseModel.find({
            _id: { $in: courseIds }
        })

        res.status(200).json({
            message: "All purchased courses",
            courseData
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            messsage: "Internal Server Error"
        })
    }
})



module.exports = {
    userRouter
}

