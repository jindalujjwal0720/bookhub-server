const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const corsConfig = require("./config/cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const connectDB = require("./config/database");
connectDB();

// Routes
app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
