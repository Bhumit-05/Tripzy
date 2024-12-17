const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const friendRouter = require("./routes/friend");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/friends", friendRouter);

function main(){
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    app.listen(4000);
}

main();