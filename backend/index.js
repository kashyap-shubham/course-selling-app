require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());


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