import React, { useEffect, useState } from 'react'
import RequestCard from '../Components/RequestCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
import DriverHeader from '../Components/DriverHeader'
import nothing from "../assets/Image/nothing.svg"

const Request = () => {
  const token = localStorage.getItem('drivertoken')
  const [requests, setRequests] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getRequest()
  }, [])

  const getRequest = async () => {
    try {
      const res = await axios.get('http://localhost:3000/request', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRequests(res.data.requests) 
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen'>
  <div className='w-full p-4'>
    <DriverHeader />
  </div>
  <h1 className='text-2xl font-semibold text-blue-950 mb-6'>My Requests</h1>
  <div className='flex flex-col justify-center items-center flex-grow'>
    {requests.length > 0 ? (
      requests.map((request, index) => (
        <RequestCard key={index} request={request} />
      ))
    ) : (
      <div className='flex flex-col items-center'>
        <img src={nothing} className='w-[300px] h-[300px] mb-4' alt="No Requests" />
        <p className='text-center w-full max-w-md font-semibold text-3xl text-blue-950'>
          No Requests Found...
        </p>
      </div>
    )}
  </div>
</div>
  )
}

export default Request
