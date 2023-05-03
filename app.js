const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_CONNECTION);

const eldercareRouter = require("./routes/eldercare");
const residentRouter = require("./routes/resident");
const driverRouter = require("./routes/driver");
const rideRouter = require("./routes/ride");

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use("/api/eldercare", eldercareRouter);
app.use("/api/resident", residentRouter);
app.use("/api/driver", driverRouter);
app.use("/api/ride", rideRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
