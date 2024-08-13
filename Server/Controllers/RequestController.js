const RequestModel = require('../Models/RequestModel')
const DriverRideModel = require('../Models/DriverRideModel')
const UserModel = require('../Models/UserModel')
const { v4 } = require('uuid')

const request = async (req, res) => {
  try {
    const { ride_id } = req.body
    const user_id = req.user.id

    const ride = await DriverRideModel.findOne({ ride_id })
    console.log(ride)
    if (!ride) {
      return res.status(404).json({
        status: 'failure',
        message: 'Ride not found'
      })
    }

    const driver_id = ride.driver_id

    const newRequest = new RequestModel({
      ride_id,
      user_id,
      driver_id
    })

    await newRequest.save()

    res.status(200).json({
      status: 'success',
      message: 'Request sent successfully',
      request: newRequest
    })
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: 'Unable to send request',
      error: err.message
    })
  }
}


const getrequests = async (req, res) => {
  const driver_id = req.user.id
  try {
    const requests = await RequestModel.find({ driver_id }).populate({
      path: 'user_id',
      select: 'user_name user_email user_phone user_age user_gender' 
    })
    console.log('requests : ', requests)

    const user = await UserModel.findOne({ _id: requests.user_id })

    await res.status(200).json({
      status: 'success',
      message: 'Requests fetched successfully',
      requests,
      user
    })
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'Cannot fetch requests',
      error: err.message
    })
  }
}

const managerequest = async (req, res) => {
  const { status, ride_id } = req.body
  console.log('from server ', status, ride_id)

  try {
    const request = await RequestModel.findOne({ ride_id })
    const ride = await DriverRideModel.findOne({ ride_id })

    if (!request) {
      return res.status(404).json({
        status: 'failure',
        message: 'Request not found'
      })
    }

    request.status = status
    await request.save()

    if (ride) {
      await DriverRideModel.deleteOne({ ride_id })
    }

    res.status(200).json({
      status: 'success',
      message: 'Request managed successfully',
      request
    })
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: 'Cannot manage request',
      error: err.message
    })
  }
}

const deleterequest = async (req, res) => {
  const driver_id = req.user.id
  const { ride_id } = req.body

  try {
    const request = await RequestModel.findOne({ ride_id })
    const driver = await RequestModel.findOne({ driver_id })
    if (!driver) {
      return res.status(404).json({
        status: 'failure',
        message: 'Driver not found'
      })
    }
    if (!request) {
      return res.status(404).json({
        status: 'failure',
        message: 'Request not found'
      })
    }

    await RequestModel.deleteOne({ ride_id })

    res.status(200).json({
      status: 'success',
      message: 'Request deleted successfully',
      request
    })
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: 'An error occurred while deleting the request',
      error: err.message
    })
  }
}

module.exports = {
  request,
  getrequests,
  managerequest,
  deleterequest
}
