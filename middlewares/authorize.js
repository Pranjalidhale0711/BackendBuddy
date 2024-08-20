const express=require("express");
const jwt = require('jsonwebtoken');

 const checkAuthorization = async (req, res, next) => {
  const token = req.headers["authorization"];
   console.log("herre",token);
  if (token == null || !token || token == undefined) {
    res.status(403).send({ message: "Something went wrong" });
    return;
  }
  const request_token = jwt.verify(token, "llll");
  req.access_token = request_token;
  // console.log("jijijijijddd");
  // console.log(token);
  if (!request_token) {
    res.status(403).send({ message: "Something went wrong" });
    return;
  }
  next();
};

module.exports=checkAuthorization;