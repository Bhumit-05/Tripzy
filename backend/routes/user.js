const express = require("express");
const Router = express.Router;
const { z } = require("zod");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userRouter = Router();

// zod -> hashing password -> store in db

userRouter.post("/signup", async function(req, res) {
    
    requiredBody = z.object({
        email : z.string().email(),
        fullName : z.string().min(3).max(20),
        username : z.string().min(3).max(20),
        password : z.string().min(5),
    })

    const {success, error} = requiredBody.safeParse(req.body);

    if(success){

        const { email, fullName, username, password } = req.body;

        try{

            const hashedPassword = await bcrypt.hash(password, 5);

            await UserModel.create({
                email : email,
                fullName : fullName,
                username : username,
                password : hashedPassword
            })

            res.json({
                message : "User created successfully"
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
            message : error.errors.map(e => {e.message})
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
                token : token
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
            message : "Invalid credentials"
        })
    }
})

module.exports = userRouter;