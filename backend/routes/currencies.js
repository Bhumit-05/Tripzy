const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { CurrencyModel } = require("../db");
const Router = express.Router;

const currencyRouter = Router();

currencyRouter.get("/", userMiddleware, async function(req, res){
    const currencies = await CurrencyModel.find({});
    res.json(currencies);
})

currencyRouter.get("/currencyDetails/:currency", userMiddleware, async function(req, res){

    const currency = req.params.currency;

    const details = await CurrencyModel.findOne({
        currencyCode : currency
    })

    res.json(details);
})

module.exports = currencyRouter;