import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileCard from '../Components/ProfileCard'
import Header from '../Components/Header'
import nothing from "../assets/Image/nothing.svg"

const Profile = () => {
  const [profile, setProfile] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {

        const res = await axios.get('https://hopeon.onrender.com/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(res.data.user)
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  return (
    <div>
      <Header />
      {profile ? <ProfileCard profile={profile}/> :  <div>
        <img src={nothing} alt="" />
        <h1 className='text-3xl font-semibold text-blue-950'>No Profile Found</h1>
        </div>
        }
    </div>
  )
}

export default Profile
