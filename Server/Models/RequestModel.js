const { request } = require('express')
const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  ride_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  }
})

const RequestModel = mongoose.model('Request', RequestSchema)
module.exports = RequestModel
