const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { TransactionModel } = require("../db");

const Router = express.Router;
const transactionRouter = Router();

transactionRouter.post("/", userMiddleware, async function(req, res){
    const userId = req.body.userId;
    const tripId = req.body.tripId;
    const amountInUSD = req.body.amountInUSD;
    const description = req.body.description;
    const date = req.body.date;
    const personal = req.body.personal;

    if(amountInUSD === undefined || amountInUSD === null || amountInUSD === 0){
        res.json({
            message : "Enter an amount"
        })
        return;
    }

    if(description===""){
        res.json({
            message : "Enter a description"
        })
        return;
    }

    if(!date){
        res.json({
            message : "Enter a date"
        })
        return;
    }
    
    await TransactionModel.create({
        userId : userId,
        tripId : tripId,
        amountInUSD : amountInUSD,
        description : description,
        personal : personal,
        date : date
    })

    res.json({
        message : "Transaction created"
    })
})

transactionRouter.get("/user/:userId/:tripId", userMiddleware, async function(req, res){
    const userId = req.params.userId;
    const tripId = req.params.tripId;

    const userTransactions = await TransactionModel.find({
        userId : userId,
        tripId : tripId
    })

    res.json({
        userTransactions
    })
})

transactionRouter.get("/trip/:tripId", userMiddleware, async function(req, res){
    const tripId = req.params.tripId;

    const tripTransactions = await TransactionModel.find({
        tripId : tripId,
        personal : false
    })

    res.json({
        tripTransactions
    })
})

transactionRouter.delete("/:transactionId", userMiddleware, async function(req, res){
    const transactionId = req.params.transactionId;

    await TransactionModel.findByIdAndDelete(transactionId);

    res.json({
        message : "Transaction deleted successfully!"
    })
})

module.exports = transactionRouter;