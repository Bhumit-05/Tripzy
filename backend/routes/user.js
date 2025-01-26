const express = require("express");
const Router = express.Router;
const { z } = require("zod");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
require('dotenv').config();

const userRouter = Router();

// zod -> hashing password -> store in db

userRouter.post("/signup", async function(req, res) {
    
    requiredBody = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }).max(20, { message: "Full name must be at most 20 characters long" }),
        username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be at most 20 characters long" }),
        password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    })

    const {success, error} = requiredBody.safeParse(req.body);

    if(success){

        const { email, fullName, username, password } = req.body;

        try{

            const hashedPassword = await bcrypt.hash(password, 5);

            const user = await UserModel.create({
                email : email,
                fullName : fullName,
                username : username,
                password : hashedPassword
            })

            res.json({
                message : "Signup successful, Sign in to continue"
            })
        }
        catch(e){
            res.json({
                message : "Username or Email already exists"
            })
        }
    }
    else{
        res.json({
            message : error.errors[0].message
        })
    }

})

// zod -> de-hash and check password -> if correct then return a token

userRouter.post("/signin", async function(req, res) {
    requiredBody = z.object({
        email : z.string().email(),
        password : z.string().min(5),
    })

    const {success, error} = requiredBody.safeParse(req.body);

    if(success){
        
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email : email
        })

        if(!user){
            res.json({
                message : "Email not signed up!"
            })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = jwt.sign({ id : user._id.toString()}, process.env.USER_JWT_SECRET);
            
            res.json({
                message : "Token sent",
                token : token,
                user : user
            });
        }
        else{
            res.status(403).json({
                message : "Incorrect password!"
            })
        }
    }
    else{
        res.json({
            message : error.errors[0].message
        })
    }
})

// Get user by id
userRouter.get("/getUsername/:userId", async function(req, res){
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    res.json({
        userId : userId,
        username : user.username
    });
})

userRouter.get("/getUser", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    res.json(user);
})

userRouter.put("/:userId", userMiddleware, async function(req, res){
    const userId = req.params.userId;
    const { fullName, dp_url, currencyCode } = req.body;

    await UserModel.findByIdAndUpdate(userId, {
        fullName : fullName,
        dp_url : dp_url,
        currencyCode : currencyCode
    })

    const user = await UserModel.findById(userId);

    res.json(user);
})

module.exports = userRouter;