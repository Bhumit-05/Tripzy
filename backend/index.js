const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const friendRouter = require("./routes/friends");
const tripRouter = require("./routes/trips");
const activityRouter = require("./routes/activities");
const transactionRouter = require("./routes/transaction");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/friends", friendRouter);
app.use("/trip", tripRouter);
app.use("/activity", activityRouter);
app.use("/transaction", transactionRouter);

function main(){
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    app.listen(4000);
}

main();