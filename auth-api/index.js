const express = require("express");
require("dotenv").config();

const app = express();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

connectDB();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});