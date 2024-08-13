const { request } = require('express')
const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  },
  // request_id:{
  //     type: String,
  //     required: true
  // },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
    // required: true
  },
  ride_id: {
    type: String,
    // ref: "DriverRide",
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  }
})

const RequestModel = mongoose.model('Request', RequestSchema)
module.exports = RequestModel
