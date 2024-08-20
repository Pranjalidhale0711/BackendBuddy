const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Profile = require("../models/Profile");
const { validemail } = require("../middlewares/validate.js");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const register = async (req, res) => {
  const { email, userName, password, confirmPassword } = req.body;
  if (!validemail(email)) {
    return res
      .status(500)
      .json({ message: "Invalid email:Please check again" });
  } else if (password != confirmPassword) {
    res
      .status(401)
      .json({ message: "Password and Confirm Password does not match" });
    return;
  } else if (userName == "" || userName == null) {
    res.status(401).json({ message: "Must provide userName" });
    return;
  }
console.log("entered here");
  //checking if already exsists
  const profile = await Profile.find({ email: email });
  if (profile.length) {
    res.status(400).json({ message: "Already Registered, Please Log in" });
    return;
  }

  //adding pepper to password
  const newPassword = password;

  //password hashing
  const hashedPassword = await bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(newPassword, salt));

  //storing in database
  Profile.create({
    email: email,
    password: hashedPassword,
    userName: userName,
    projects: [],
  })
    .then(() => {
      console.log("heeeeee");
      return res.status(200).json({ message: "Registered successfully" });
    })
    .catch((error) => {
      console.log("error is", error);
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
      return;
    });
};
const fetchUser = (req, res) => {
  res.status(200).json({ message: req.decoded_token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // validators
  if (!validemail(email)) {
    return res
      .status(500)
      .json({ message: "Invalid email:Please check again" });
  } else if (email === "" || password === null) {
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
  const newPassword = password;

  // comparing hashed password
  const validatePassword = await bcrypt.compare(newPassword, profile.password);
  if (!validatePassword) {
    res.status(401).json({ message: "Inavalid credentials, Please try again" });
    return;
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: profile._id,
      email: profile.email,
      userName: profile.userName,
    },
    "llll"
  );

  res.status(200).json({ message: "Login Successful", data: token });
};

const addProject = async (req, res) => {
  const { userId, projectId } = req.body;
  console.log("user id ", userId);
  // console.log(projectId);
  const user = await Profile.findById(userId);
  if (!user || user == undefined || user == null) {
    return res.status(500).json({ message: "User does not exists" });
  }
  try {
    user.projects.push(projectId);
    await user.save();
    return res.status(200).json({ message: "Projectid added" });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};

const deleteProject = async (req, res) => {
  const { userId, projectId } = req.body;
  console.log("user id ", userId);
  const user = await Profile.findById(userId);
  console.log("user is", user);
  if (!user || user == undefined || user == null) {
    return res.status(500).json({ message: "User does not exists" });
  }
  try {
    const tempProj = [];
    user.projects.map((project) => {
      if (!project.equals(projectId)) {
        tempProj.push(project);
      }
    });
    user.projects = tempProj;
    await user.save();
    return res.status(200).json({ message: "Projectid deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};

module.exports = {
  register,
  login,
  addProject,
  deleteProject,
  fetchUser
};
