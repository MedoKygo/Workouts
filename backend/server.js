require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// Express app
const app = express();
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })
