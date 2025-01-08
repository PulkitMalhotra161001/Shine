const express = require("express");
const whiteboardRoutes = require("./routes/whiteboardRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/whiteboards", whiteboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
