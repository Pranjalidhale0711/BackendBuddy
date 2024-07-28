const express = require("express");
const dotenv =require('dotenv');
const  mongoose =require("mongoose") ;
const roleRoutes=require("./routes/role_routes");

const cors =require('cors');
const app = express();
dotenv.config();

//connecting database
const PORT = process.env.PORT || 8022;
mongoose.connect("mongodb://localhost:27017/pranjalibackendbuddy").then(()=>{
 console.log("Database connected")
})

//using middlewares
app.use(express.json());

app.use(cors());
app.use("/api/v1", roleRoutes);


//running server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});