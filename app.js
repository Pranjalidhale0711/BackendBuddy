const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./connect");
const routes = require("./routes/route");
dotenv.config();

connect(process.env.MONGO_URI);

// Using middlewares
app.use(express.json());
app.use(cors({ origin:'http://localhost:3000', credentials: true }));
app.use("/api/v1", routes);

//Starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});