const DriverModel = require('../Models/DriverModel')
const DriverRideModel = require('../Models/DriverRideModel')
const UserModel = require('../Models/UserModel')
const { v4 } = require('uuid')

const driverride = async (req, res) => {
  try {
    const { departure, arrival, date, time, fare } = req.body
    const driver_id = req.user.id

    const newride = new DriverRideModel({
      ride_id: v4(),
      driver_id,
      departure,
      arrival,
      date : new Date(date).toISOString(),
      time,
      fare
    })
    await newride.save()
    res.status(200).json({
      status: 'success',
      message: 'Ride created successfully',
      newride
    })
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'cant create ride',
      error: err.message
    })
  }
}

const getrides = async (req, res) => {
  const driver_id = req.user.id

  try {
    const user = await DriverModel.findById(driver_id)
    if (!user) {
      return res.status(401).json({
        status: 'failure',
        message: 'User not found'
      })
    }

    const rides = await DriverRideModel.find({ driver_id }).populate(
      'driver_id',
      'user_name user_email user_phone'
    )

    res.status(200).json({
      status: 'success',
      message: 'Rides fetched successfully',
      rides,
      user
    })
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'Cannot fetch rides',
      error: err.message
    })
  }
}

const getallrides = async (req, res) => {
  try {
    const rides = await DriverRideModel.find()
    const users = await DriverModel.find()

    const userMap = users.reduce((map, user) => {
      map[user._id.toString()] = user
      return map
    }, {})

    const ridesWithUserDetails = rides.map((ride) => {
      const userId = ride.driver_id ? ride.driver_id.toString() : null
      return {
        ...ride.toObject(),
        driver: userMap[userId] || null
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'All rides fetched with user details',
      rides: ridesWithUserDetails
    })
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: 'Failed to fetch rides',
      error: err.message
    })
  }
}

const deleteride = async (req, res) => {
  const driver_id = req.user.id
  const ride_id = req.params.id

  try {
    const user = await DriverModel.findOne({ _id: driver_id })

    if (!user) {
      return res.status(404).json({
        status: 'failure',
        message: 'Driver not found'
      })
    }

    const ride = await DriverRideModel.findOneAndDelete({ ride_id, driver_id })

    if (!ride) {
      return res.status(404).json({
        status: 'failure',
        message: 'Ride not found or does not belong to the user'
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Ride deleted successfully',
      ride
    })
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'Cannot delete ride',
      error: err.message
    })
  }
}

module.exports = { driverride, getrides, deleteride, getallrides }
