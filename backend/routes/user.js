const express = require("express");
const Router = express.Router;
const { z } = require("zod");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");

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

module.exports = userRouter;