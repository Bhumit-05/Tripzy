const express = require("express");
const { TripModel, ActivityModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

const Router = express.Router;

const tripRouter = Router();

tripRouter.post("/", userMiddleware, async function(req, res){

    const { name, destination, startDate, endDate } = req.body;

    if(name===""){
        res.json({
            message : "Enter a name for the trip"
        })
        return;
    }
    if(destination===""){
        res.json({
            message : "Enter a destination"
        })
        return;
    }
    if(startDate===null){
        res.json({
            message : "Enter a start date for the trip"
        })
        return;
    }
    if(endDate===null){
        res.json({
            message : "Enter an end date for the trip"
        })
        return;
    }
    
    try{
        const trip = await TripModel.create({
            name : name,
            destination : destination,
            travelers : [req.userId],
            startDate : startDate,
            endDate : endDate,
        });
    
        res.json({
            message : "Trip created",
            tripName : name,
            tripId : trip._id
        })
    }
    catch(e){
        res.json({
            message : e
        })
    }
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
    
    (Activities);

    res.json({
        Activities : Activities
    })
})

module.exports = tripRouter;