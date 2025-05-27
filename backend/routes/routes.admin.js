const { Router } = require("express");
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = requir("jsonwebtoken");
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    try {
        const existingAdmin = await userModel.findOne({email});
        if (existingUser) {
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

adminRouter.post("/sigin", async (req, res) => {
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

adminRouter.post("/createCourses", (req, res) => {

})

adminRouter.put("/updateCourse", (req, res) => {

})

adminRouter.get("/createdCourses", (req, res) => {

})


module.exports = {
    adminRouter
}
