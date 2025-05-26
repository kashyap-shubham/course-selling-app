require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/routes.user");
const { adminRouter } = require("./routes/routes.admin");
const { courseRouter } = require("./routes/routes.course");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


const main = () => {
    mongoose.connect(port)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`Server started at port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
        console.log("Db connection failed closing the server");
        process.exit(1);
    })
}

main();