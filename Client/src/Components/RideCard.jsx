import React, { useState } from 'react'
import Button from '../assets/Button'
import axios from 'axios'
import fromicon from '../assets/Image/from.svg'
import toicon from '../assets/Image/to.svg'
import dateicon from '../assets/Image/datesvg.svg'
import timeicon from '../assets/Image/time.svg'
import status from '../assets/Image/status.svg'
import { useSelector } from 'react-redux'

const RideCard = ({ ride }) => {
  const [requestStatus, setRequestStatus] = useState(null)
  // const token = useSelector((state) => state.user.token)
  const token = localStorage.getItem('token')

  const handleRequest = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:3000/request',
        {
          ride_id: ride.ride_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res)
      console.log('Requested Successfully')
      setRequestStatus('requested')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col items-center bg-slate-200 w-[500px] p-8 h-auto m-8 rounded-xl gap-4 text-black'>
      <div className='flex flex-col text-center text-xl w-full text-blue-950 font-semibold'>
        <div className='flex justify-around mb-5'>
          <div className='flex items-center gap-2'>
            <img src={fromicon} alt='Departure Icon' className='w-12' />
            <span>{ride.departure}</span>
          </div>
          <div className='flex items-center gap-2'>
            <img src={toicon} alt='Arrival Icon' className='w-12' />
            <span>{ride.arrival}</span>
          </div>
        </div>

        <div className='flex justify-around mb-5'>
          <div className='flex items-center gap-2'>
            <img src={dateicon} alt='Date Icon' className='w-9' />
            <span>{ride.date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <img src={timeicon} alt='Time Icon' className='w-9' />
            <span>{ride.time}</span>
          </div>
        </div>

        <div className='flex flex-col items-center mb-5'>
          <h1 className='text-2xl mb-2'>₹{ride.fare}</h1>
          <div className='bg-green-600 w-[100px] p-2 rounded-2xl flex items-center'>
            <img src={status} alt='Status Icon' className='w-10' />
            <span className='ml-2'>{ride.status}</span>
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        {requestStatus === 'requested' ? (
          <h1 className='bg-blue-600 text-white font-semibold p-3 rounded-2xl'>
            Waiting for Confirmation
          </h1>
        ) : (
          <Button onClick={(e) => handleRequest(e)}>Send Request</Button>
        )}
      </div>
    </div>
  )
}

export default RideCard
