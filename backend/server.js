const express = require("express");
const mongoose = require("mongoose");
const whiteboardRoutes = require("./routes/whiteboardRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_DB_KEY
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error Occured ",err));

//Routes
app.use("/api/whiteboards", whiteboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
