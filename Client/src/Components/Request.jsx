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
    <div className='flex flex-col items-center'>
      <DriverHeader />
      <h1 className=' text-2xl font-semibold text-blue-950'>My Request</h1>
      <div className='flex flex-col justify-center items-center h-screen'>
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <RequestCard key={index} request={request} />
        ))
      ) : (
        <div>
          <img src={nothing} className='w-[300px] h-[300px]' />
          <p className=' text-center w-full max-w-md font-semibold text-3xl text-blue-950 '>
          No Requests Found...
        </p>
        </div>
      )}
    </div>
    </div>
  )
}

export default Request
