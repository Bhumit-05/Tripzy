const express = require("express");
const { userMiddleware } = require("../middlewares/user");
const { ActivityModel } = require("../db");

const Router = express.Router;
const activityRouter = Router();

activityRouter.post("/", userMiddleware, async function(req, res){
    const tripId = req.body.tripId;
    const activity = req.body.activity;
    req.body.date = new Date(req.body.date);

    const date = req.body.date;

    await ActivityModel.create({
        tripId : tripId,
        activity : activity,
        date : date
    })

    res.json({
        message : "Activity added to the trip"
    })
})

activityRouter.get("/:tripId", userMiddleware, async function(req, res){
    const tripId = req.params.tripId;

    const activities = await ActivityModel.find({
        tripId : tripId
    })

    res.json({
        activities
    })
})

activityRouter.delete("/", userMiddleware, async function(req, res){
    const activityId = req.body.activityId;
    
    await ActivityModel.findByIdAndDelete(activityId);

    res.json({
        message : "Activity deleted"
    })
})

activityRouter.put("/", userMiddleware, async function(req, res){
    const activityId = req.body.activityId;
    const activity = req.body.activity;
    req.body.date = new Date(req.body.date);
    const date = req.body.date;
    const tripId = req.body.tripId;

    await ActivityModel.findByIdAndUpdate(activityId, {
        tripId : tripId,
        activity : activity,
        date : date
    })

    res.json({
        message : "Activity updated"
    })
})

activityRouter.get("/getState/:activityId", userMiddleware, async function(req, res){
    const activityId = req.params.activityId;
    
    const activity = await ActivityModel.findById(activityId);

    res.json({
        status : activity.status
    })
})

activityRouter.post("/setState/:activityId", userMiddleware, async function(req, res){
    const activityId = req.params.activityId;

    const status = req.body.status;
    await ActivityModel.findByIdAndUpdate(activityId, {
        status : status
    },{
        new : true // returns the updated document
    })

    res.json({
        "status" : status
    })
})

module.exports = activityRouter;