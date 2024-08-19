import React, { useState } from 'react'
import name from '../assets/Image/name.svg'
import email from '../assets/Image/mail.svg'
import phone from '../assets/Image/phone.svg'
import gender from '../assets/Image/gender.svg'
import statusimage from '../assets/Image/status.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

const RequestCard = ({ request }) => {
  const token = localStorage.getItem('drivertoken')
  const [requestStatus, setRequestStatus] = useState(request.status)
  const user = request.user_id

  // const handleAccept = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await axios.put(
  //       'http://localhost:3000/request',
  //       {
  //         status: 'accept',
  //         ride_id: request.ride_id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     setRequestStatus('accept')
  //     toast.success('Accepted successfully')
  //   } catch (err) {
  //     console.error('Error accepting request:', err.message)
  //   }
  // }

  const handleAccept = async (e) => {
    e.preventDefault()
      try{
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/acceptmail`, {
          ride_id: request.ride_id,
        })
        setRequestStatus('accept')
        toast.success('Request accepted')
      }
    catch(err){
      console.error('Error sending email:', err.message)
      toast.error('Failed to send email')
    }
  }

  const handleDecline = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ride_id: request.ride_id,
        },
      })
      setRequestStatus('decline')
      toast.success('Request declined')
    } catch (err) {
      console.error('Error declining request:', err.message)
    }
  }

  return (
    <div className='flex flex-wrap md:flex-row justify-evenly items-center text-blue-950 font-semibold p-6 rounded-lg mb-4 bg-white shadow-lg'>
      <div className='space-y-4 w-full md:w-[500px] bg-slate-100 p-10 rounded-3xl'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <img src={name} className='w-8 h-8' alt='Name Icon' />
            <p className='text-lg font-semibold'>{user.user_name}</p>
          </div>
          <div className='flex items-center gap-4'>
            <img src={email} className='w-8 h-8' alt='Email Icon' />
            <p className='text-lg font-semibold'>{user.user_email}</p>
          </div>
          <div className='flex items-center gap-4'>
            <img src={phone} className='w-8 h-8' alt='Phone Icon' />
            <p className='text-lg font-semibold'>{user.user_phone}</p>
          </div>
          <div className='flex items-center gap-4'>
            <img src={gender} className='w-8 h-8' alt='Gender Icon' />
            <p className='text-lg font-semibold'>{user.user_gender}</p>
          </div>
          <div className='flex items-center gap-4'>
            <img src={statusimage} className='w-8 h-8' alt='Status Icon' />
            <p
              className={`text-lg text-white font-semibold p-3 rounded ${
                requestStatus === 'accept' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {requestStatus}
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-8 mt-4 md:mt-0 text-white'>
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
