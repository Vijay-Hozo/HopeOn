const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const UserRoute = require("./Routes/UserRoute/UserRoute")
const DriverRoute = require("./Routes/DriverRoute/DriverRoute") 
const UserRideRoute = require("./Routes/UserRoute/UserRideRoute")
const RideRoute = require('./Routes/UserRoute/RideRoute')

const app = express()
app.use(bodyparser.json())
app.use(cors())

mongoose.connect(
    'mongodb+srv://vijay2304a:vijay123@cluster0.tzmkqeo.mongodb.net/HopeOn?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use('/',UserRoute)
app.use('/',DriverRoute)
app.use('/',UserRideRoute)
app.use("/",RideRoute);


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})