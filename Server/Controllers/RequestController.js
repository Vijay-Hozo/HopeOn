const RequestModel = require("../Models/RequestModel");
const DriverRideModel = require("../Models/DriverRideModel");
const UserModel = require("../Models/UserModel");
const { v4 } = require('uuid')

const request = async (req, res) => {
    try {
        const  {ride_id}  = req.body;
        const user_id = req.user.id;
        const newrequest = await new RequestModel({
            ride_id,
            user_id
        })
        await newrequest.save();
        res.status(200).json({
            status: "success",
            message: "Request sent successfully",
            newrequest
        })
    }
    catch (err) {
        res.status(400).json({
            status: "failure",
            message: "cant send request",
            error: err.message
        })
    }
}

const getrequests = async (req, res) => {
    const user_id = req.user.id;
    console.log(user_id);
    
    try {
        const user = await UserModel.find({ user_id });
        if (!user) {
            return res.status(401).json({
                status: "failure",
                message: "User not found"
            })
        }   
        const requests = await RequestModel.find({ user_id });
        console.log(requests);
        
        res.status(200).json({
            status: "success",
            message: "Requests fetched successfully",
            requests
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant fetch requests",
            error:err.message
        })
    }
}

const managerequest = async (req, res) => {
    const { status } = req.body;
    const ride_id = req.params.id;
    try {
        const request = await RequestModel.findOne({ ride_id });
        if (!request) {
            return res.status(401).json({
                status: "failure",
                message: "Request not found"
            })
        }
        request.status = status;
        await request.save();
        res.status(200).json({
            status: "success",
            message: "Request managed successfully",
            request
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure",
            message:"cant manage request",
            error:err.message
        })
    }
}

module.exports = {
    request,
    getrequests,
    managerequest
}