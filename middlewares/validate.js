const { header } = require('express-validator');
const jwt = require('jsonwebtoken');

 const checkAuthorizationHeaders = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token == null || !token || token == undefined) {
    res.status(403).send({ message: "Token is missing" });
    return;
  }

  if (!token.startsWith('Bearer ')) {
    console.log("returning false");
    return res.status(500).send({ message: "Token not found" });
    return false;
  }
  const access_token = token.split('Bearer ')[1];
  const decoded = await decodeToken(access_token);
  if(!decoded){
    console.log("sending session expired");
    return res.status(500).send({message:'Session Expired! Please login again'})
  }
  req.access_token = await decodeToken(access_token);
  console.log("access token is", req.access_token);
  if (!req.access_token) {
    return res.status(500).send({message:'Session Expired! Please login again'});
  }
  // return true;

  next();
}

const decodeToken = async (token, accessType = null) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded success");
      return decodedToken;
  } catch (error) {
      console.error("Token verification failed:", error.message);
      return false;
  }
};
module.exports={
  checkAuthorizationHeaders
}