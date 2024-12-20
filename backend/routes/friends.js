const express = require("express");
const Router = express.Router;
const { UserModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
require('dotenv').config();
const friendRouter = Router();

// Add a friend
friendRouter.post("/friends", userMiddleware,async function(req, res){
    const userId = req.userId;
    const friendName = req.body.friendName;

    const friend = await UserModel.findOne({
        username : friendName
    })

    if(friend._id == userId){
        res.json({
            message : "Friend name and your username can't be same"
        })
        return;
    }
    
    const user = await UserModel.findById(userId);
    const friendList = user.friends;

    let alreadyFriend = 0;
    friendList.map(f => {
        if(f.equals(friend._id)) alreadyFriend=1;
    })

    if(alreadyFriend){
        res.json({
            message : "Given user is already a friend"
        })
        return;
    }

    if(friend){
        // adding friend in user's friend list
        await UserModel.updateOne({
            _id : userId
        },{
            $push : {
                friends : {
                    $each : [
                        friend._id
                    ]
                }
            }
        })

        // adding user in friend's friend list
        await UserModel.updateOne({
            _id : friend
        },{
            $push : {
                friends : {
                    $each : [
                        user._id
                    ]
                }
            }
        })

        res.json({
            message : "Friend has been added!"
        })
    }
    else{
        res.json({
            message : "Given username doesn't exists"
        })
    }
})

// Get friends
friendRouter.get("/", userMiddleware, async function(req, res){
    // I am storing friend's username and not id because when i will be required to display the friends in frontend, so for each friend i will have to call the db to find the username for each respective userId. Since, each username is also unique, it will not create any problem
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    const friends = user.friends;

    res.json({
        friends
    })
})

// Remove a friend
friendRouter.delete("/", userMiddleware, async function(req, res){
    const userId = req.userId
    const friendName = req.body.friendName;

    const user = await UserModel.findById(userId);

    const friendList = user.friends;

    let isFriend = 0;
    friendList.map(friend => {
        if(friend==friendName){
            isFriend = 1;
        }
    })

    if(isFriend){
        await UserModel.updateOne({
            _id : userId
        },{
            $pull : {friends : friendName}
        });

        await UserModel.updateOne({
            username : friendName
        },{
            $pull : {friends : user.username}
        });

        res.json({
            message : "Friend removed"
        })
    }
    else{
        res.json({
            message : "Given username is not your friend"
        })
    }
})

module.exports = friendRouter;