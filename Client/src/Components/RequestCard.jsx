import React, { useState } from 'react'
import name from '../assets/Image/name.svg'
import email from '../assets/Image/mail.svg'
import phone from '../assets/Image/phone.svg'
import age from '../assets/Image/age.svg'
import gender from '../assets/Image/gender.svg'
import statusimage from '../assets/Image/status.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

const RequestCard = ({ request }) => {
  const token = localStorage.getItem('drivertoken')

  const [requestStatus, setRequestStatus] = useState(request.status)
  const [status, setStatus] = useState('')

  const user = request.user_id

  const handleAccept = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        'http://localhost:3000/request',
        {
          status: 'accept',
          ride_id: request.ride_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setRequestStatus('accept')
      toast.success('Accepted successfully')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDecline = async (e) => {
    e.preventDefault()
    const payload = {
      ride_id: request.ride_id
    }

    try {
      const res = await axios.delete('http://localhost:3000/request', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: payload
      })
      console.log('Request deleted')
      console.log(res)
      setRequestStatus('decline')
      toast.success('Request declined')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center text-blue-950 font-semibold p-6 rounded-lg mb-4'>
      <div className='space-y-4 w-[500px] bg-slate-100 p-10 rounded-3xl'>

        <div className='flex items-center gap-20'>
          <img src={name} className='w-8 h-8' alt='Name Icon' />
          <p className='text-lg font-semibold'>{user.user_name}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={email} className='w-8 h-8' alt='Email Icon' />
          <p className='text-lg font-semibold'>{user.user_email}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={phone} className='w-8 h-8' alt='Phone Icon' />
          <p className='text-lg font-semibold'>{user.user_phone}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={age} className='w-8 h-8' alt='Age Icon' />
          <p className='text-lg font-semibold'>{user.user_age}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={gender} className='w-8 h-8' alt='Gender Icon' />
          <p className='text-lg font-semibold'>{user.user_gender}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={statusimage} className='w-8 h-8' alt='Status Icon' />
          {requestStatus === 'accept' ? (
            <p
              className='text-lg text-white font-semibold bg-green-500 p-3 rounded'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {requestStatus}
            </p>
          ) : (
            <p className='text-lg font-semibold bg-red-500 p-3 rounded'>
              {requestStatus}
            </p>
          )}
        </div>
      </div>
      <div className='flex gap-16 mt-4 md:mt-0 text-white'>
        <button className='bg-green-600 p-4 rounded-2xl' onClick={handleAccept}>
          Accept
        </button>
        <button className='bg-red-500 p-4 rounded-2xl' onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  )
}

export default RequestCard
