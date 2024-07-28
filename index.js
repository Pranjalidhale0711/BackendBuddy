const express = require("express");
const dotenv =require('dotenv');
const  mongoose =require("mongoose") ;
const authRoutes=require("./routes/auth_routes.js");
const cors =require('cors');



const app = express();
dotenv.config();

//connecting database
const PORT = process.env.PORT || 8020;
mongoose.connect("mongodb://localhost:27017/pranjalibackendbuddy").then(()=>{
 console.log("Database connected")
})

//using middlewares
app.use(express.json());

app.use(cors());
app.use("/api/v1", authRoutes);

//running server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});