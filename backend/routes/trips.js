const express = require("express");
const { TripModel, ActivityModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

const Router = express.Router;

const tripRouter = Router();

tripRouter.post("/", userMiddleware, async function(req, res){

    const { startDate, endDate } = req.body;

    req.body.startDate = new Date(startDate);
    req.body.endDate = new Date(endDate);


    const { name, destination } = req.body;
    startDate, endDate = req.body;
    const userId = req.userId;
    
    await TripModel.create({
        name : name,
        destination : destination,
        travelers : [userId],
        startDate : startDate,
        endDate : endDate,
    });

    res.json({
        message : "Trip created"
    })
})

tripRouter.get("/", userMiddleware, async function(req, res){
    userId = req.userId;

    const trips = await TripModel.find({
        travelers : userId,
    })

    res.json({
        trips : trips
    })
})

tripRouter.delete("/", userMiddleware, async function(req, res){
    tripId = req.body.tripId;

    await TripModel.findByIdAndDelete(tripId);

    res.json({
        message : "Trip successfully deleted!"
    })
})

tripRouter.patch("/addTraveler", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;
    const travelerId = req.body.travelerId;

    await TripModel.findByIdAndUpdate(tripId, {
        $push : {travelers : travelerId}
    });

    res.json({
        message : "Traveler added to the trip successfully!"
    });
})

tripRouter.patch("/removeTraveler", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;
    const travelerId = req.body.travelerId;

    await TripModel.findByIdAndUpdate(tripId, {
        $pull : {travelers : travelerId}
    });

    res.json({
        message : "Traveler removed from the trip successfully!"
    });
})

tripRouter.get("/getActivities", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;

    const Activities = await ActivityModel.find({
        tripId : tripId
    })
    
    console.log(Activities);

    res.json({
        Activities : Activities
    })
})

module.exports = tripRouter;