const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const UserRoute = require("./Routes/UserRoute")
const DriverRoute = require("./Routes/DriverRoute")
const UserRideRoute = require("./Routes/UserRideRoute")
const DriverRideRoute = require("./Routes/DriverRideRoute")
const RequestController = require("./Routes/RequestRoute")
const OTPRoute = require("./Routes/OTPRoute")

const app = express()
app.use(bodyparser.json())
app.use(cors())

mongoose.connect(
    process.env.MONGODB_URL
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use('/',UserRoute)
app.use('/',DriverRoute)
app.use('/',UserRideRoute)
app.use('/',DriverRideRoute)
app.use('/',RequestController)
app.use('/',OTPRoute)
// app.use("/",RideRoute);


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})