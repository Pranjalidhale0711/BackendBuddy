const express = require("express");
const dotenv =require('dotenv');
const  mongoose =require("mongoose") ;
const schema_routes=require("./Routes/schema_routes")

const cors =require('cors');
const app = express();
dotenv.config();

//connecting database
const PORT = process.env.PORT || 8023;
mongoose.connect("mongodb://localhost:27017/pranjalibackendbuddy").then(()=>{
 console.log("Database connected")
})

//using middlewares
app.use(express.json());

app.use(cors());
app.use("/api/v1",schema_routes );


//running server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});