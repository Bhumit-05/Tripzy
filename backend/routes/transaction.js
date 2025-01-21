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

    if(!amountInUSD){
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
        date : date
    })

    res.json({
        message : "Transaction created"
    })
})

transactionRouter.get("/user", userMiddleware, async function(req, res){
    const userId = req.body.userId;

    const userTransactions = await TransactionModel.find({
        userId : userId
    })

    res.json({
        userTransactions
    })
})

transactionRouter.get("/trip", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;

    const tripTransactions = await TransactionModel.find({
        tripId : tripId
    })

    res.json({
        tripTransactions
    })
})

transactionRouter.put("/", userMiddleware, async function(req, res){
    const transactionId = req.body.transactionId;
    const userId = req.body.userId;
    const tripId = req.body.tripId;
    const amount = req.body.amount;
    const description = req.body.description;

    await TransactionModel.findByIdAndUpdate(transactionId, {
        userId : userId,
        tripId : tripId,
        amount : amount,
        description : description,
    })
})

module.exports = transactionRouter;