const express = require("express");
const { TripModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const { z } =require("zod");

const Router = express.Router;

const tripRouter = Router();

tripRouter.post("/trip", userMiddleware, async function(req, res){

    const { startDate, endDate } = req.body;

    req.body.startDate = new Date(startDate);
    req.body.endDate = new Date(endDate);

    requiredBody = z.object({
        name : z.string(),
        destination : z.string(),
        startDate : z.date(),
        endDate : z.date(),
    })

    const { success, error } = requiredBody.safeParse(req.body);

    if(success){
        const { name, destination, startDate, endDate } = req.body;
        
        await TripModel.create({
            name : name,
            destination : destination,
            startDate : startDate,
            endDate : endDate,
        });

        res.json({
            message : "Trip created"
        })
    }
    else{
        res.json({
            message : "Invalid format"
        })
    }
})

module.exports = tripRouter;