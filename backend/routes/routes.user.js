const { Router } = require("express");
const userRouter = Router();


userRouter.post("/signup", (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    // add input validation here
})

userRouter.post("/signin", (req, res) => {

})

userRouter.get("/purchases", (req, res) => {

})



module.exports = {
    userRouter
}

