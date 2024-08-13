import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DriverProfileCard from '../Components/DriverProfileCard'
import DriverHeader from '../Components/DriverHeader'
import nothing from "../assets/Image/nothing.svg"


const DriverProfile = () => {
  const [Driverprofile, setDriverProfile] = useState(null)
  const drivertoken = localStorage.getItem('drivertoken')

  useEffect(() => {
    getDriverProfile()
  }, [])

  const getDriverProfile = async () => {
    try {
        const res = await axios.get('http://localhost:3000/driver', {
          headers: {
            Authorization: `Bearer ${drivertoken}`
          }
        })
        setDriverProfile(res.data.user)
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  return (
    <div>
      <DriverHeader />
      {Driverprofile ? <DriverProfileCard Driverprofile={Driverprofile} /> : 
      <div>
        <img src={nothing} alt="" />
        <h1 className='text-3xl font-semibold text-blue-950'>No Profile Found</h1>
        </div>
      }
    </div>
  )
}

export default DriverProfile
