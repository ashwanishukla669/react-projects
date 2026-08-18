const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;   
    
    const user = await User.findOne({ email });

    if(user){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const newUser = await User.create({
        name,
        email,
        password
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser
    });

});