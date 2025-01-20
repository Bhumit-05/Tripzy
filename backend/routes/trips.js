const express = require("express");
const { TripModel, ActivityModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

const Router = express.Router;

const tripRouter = Router();

tripRouter.post("/", userMiddleware, async function(req, res){

    const { name, destination, startDate, endDate, currency } = req.body;

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
            travellers : [req.userId],
            startDate : startDate,
            endDate : endDate,
            currencyCode : currency
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
        travellers : userId,
    })

    res.json(trips)
})

tripRouter.get("/oneTrip/:tripId", userMiddleware, async function(req, res){
    const {tripId} = req.params;

    const trip = await TripModel.findById(tripId);
    res.json(trip);
})

tripRouter.delete("/", userMiddleware, async function(req, res){
    tripId = req.body.tripId;

    await TripModel.findByIdAndDelete(tripId);

    res.json({
        message : "Trip successfully deleted!"
    })
})

tripRouter.post("/addTraveller", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;
    const travellerId = req.body.travellerId;

    await TripModel.findByIdAndUpdate(tripId, {
        $push : {travellers : travellerId}
    });

    res.json({
        message : "Traveller added to the trip successfully!"
    });
})

tripRouter.delete("/removeTraveller", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;
    const travellerId = req.body.travellerId;

    await TripModel.findByIdAndUpdate(tripId, {
        $pull : {travellers : travellerId}
    });

    res.json({
        message : "Traveller removed from the trip successfully!"
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

tripRouter.get("/getDetails", async function(req, res){
    const tripId = req.body.tripId;

    const trip = await TripModel.findById(tripId);

    res.json(trip);
})

module.exports = tripRouter;