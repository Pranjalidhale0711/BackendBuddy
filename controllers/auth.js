const express = require("express");
const Profile = require("../models/profile")
const { validate } = require("../middlewares/validate")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, userName, password, confirmPassword } = req.body;

    //validators
    if (!validate("email", email)) {
        res.status(401).json({ message: "Invalid Email, Please check again" });
        return;
    }
    else if (!validate("password", password)) {
        res.status(401).json({ message: "Invalid Password, Please check again" });
        return;
    }
    else if (password != confirmPassword) {
        res.status(401).json({ message: "Password and Confirm Password does not match" });
        return;
    }
    else if (userName == "" || userName == null) {
        res.status(401).json({ message: "Must provide userName" });
        return;
    }

    //checking if already exsists
    const profile = await Profile.find({ email: email });
    if (profile.length) {
        res.status(400).json({ message: "Already Registered, Please Log in" });
        return;
    }

    //adding pepper to password
    const newPassword = password + process.env.PEPPER;

    //password hashing
    const hashedPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(newPassword, salt))

    //storing in database
    Profile.create({ email: email, password: hashedPassword, userName: userName, projects:[]}).then(() => {
        return res.status(200).json({ message: "Registered successfully" })
    }).catch((error) => {
        console.log("error is", error)
        res.status(500).json({ message: "Something went wrong, please try again" });
        return;
    })
}
const login = async (req, res) => {
    const { email, password } = req.body;

    // validators
    if (!validate("email", email)) {
        res.status(401).json({ message: "Invalid Email, Please check again" });
        return;
    }
    else if (email === "" || password === null) {
        res.status(401).json({ message: "Must provide login credentials" });
        return;
    }

    // checking if user exists
    const profile = await Profile.findOne({ email: email });
    if (!profile) {
        res.status(404).json({ message: "User not found, Please register!" });
        return;
    }

    //adding pepper to password
    const newPassword = password + process.env.PEPPER;

    // comparing hashed password
    const validatePassword = await bcrypt.compare(newPassword, profile.password);
    if (!validatePassword) {
        res.status(401).json({ message: "Inavalid credentials, Please try again" });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({
        id: profile._id,
        email: profile.email,
        userName:profile.userName
    },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({message: "Login Successful", data:token})

}

const fetchUser = async(req,res) =>{
    console.log("came in fetch user controller", req.access_token);
    res.status(200).json({message:req.access_token});
}

module.exports = {
    register,
    login,
    fetchUser
};