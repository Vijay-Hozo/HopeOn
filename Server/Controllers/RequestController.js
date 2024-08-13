const RequestModel = require("../Models/RequestModel");
const DriverRideModel = require("../Models/DriverRideModel");
const UserModel = require("../Models/UserModel");
const { v4 } = require('uuid')

const request = async (req, res) => {
    try {
        const { ride_id } = req.body;
        const user_id = req.user.id;
        console.log(user_id,ride_id);
        

        const ride = await DriverRideModel.findOne({ ride_id });

        if (!ride) {
            return res.status(404).json({
                status: "failure",
                message: "Ride not found"
            });
        }

        const driver_id = ride.driver_id;

        const newRequest = new RequestModel({
            ride_id,
            user_id,
            driver_id
        });

        await newRequest.save();

        res.status(200).json({
            status: "success",
            message: "Request sent successfully",
            request: newRequest
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: "Unable to send request",
            error: err.message
        });
    }
};


// const getrequests = async (req, res) => {
//     const driver_id = req.user.id; 
//     console.log(driver_id);

//     try {
//         const requests = await RequestModel.find({ driver_id })
//             .populate({
//                 path: 'user_id',
//                 select: 'user_name user_email user_phone user_age user_gender'  // Select user details
//             })
//             .populate({
//                 path: 'ride_id',
//                 model: 'DriverRide',  
//                 populate: {
//                     path: 'driver_id',  // Populate driver details within the ride
//                     model: 'Driver',  // Reference the Driver model
//                     select: 'driver_name driver_email driver_phone vehicle_number'
//                 }
//             });
//             console.log(requests);
            
//         res.status(200).json({
//             status: "success",
//             message: "Requests and associated user and ride details fetched successfully",
//             requests
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: "failure",
//             message: "Cannot fetch requests",
//             error: err.message
//         });
//     }
// };

const getrequests = async (req, res) => {
    const driver_id = req.user.id;
    console.log(driver_id);
    
    
    try {
        const requests = await RequestModel.find({ driver_id })
        await res.status(200).json({
            status: "success",
            message: "Requests fetched successfully",
            requests
        }); 
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: "Cannot fetch requests",
            error: err.message
        });
    }
};

const managerequest = async (req, res) => {
    const { status, ride_id } = req.body;
    try {
        const request = await RequestModel.findOne({ ride_id });
        const ride = await DriverRideModel.findOne({ ride_id });

        if (!request) {
            return res.status(404).json({
                status: "failure",
                message: "Request not found"
            });
        }

        request.status = status;
        await request.save();

        if (ride) {
            await DriverRideModel.deleteOne({ ride_id });
        }

        res.status(200).json({
            status: "success",
            message: "Request managed successfully",
            request
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: "Cannot manage request",
            error: err.message
        });
    }
};


const deleterequest = async (req, res) => {
    const driver_id = req.user.id;
    const { ride_id } = req.body;
    

    try {
        const request = await RequestModel.findOne({  ride_id });
        const driver = await RequestModel.findOne({driver_id});
        if(!driver){
            return res.status(404).json({
                status:"failure",
                message:"Driver not found"
            })
        }
        if (!request) {
            return res.status(404).json({
                status: "failure",
                message: "Request not found"
            });
        }

        await RequestModel.deleteOne({  ride_id });

        res.status(200).json({
            status: "success",
            message: "Request deleted successfully",
            request
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            status: "failure",
            message: "An error occurred while deleting the request",
            error: err.message
        });
    }
}


module.exports = {
    request,
    getrequests,
    managerequest,
    deleterequest
}