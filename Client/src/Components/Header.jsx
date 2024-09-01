import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Title from '../assets/Title'
import { Link } from 'react-router-dom'
import profile from '../assets/Image/profile.svg'
import logout from '../assets/Image/logout.svg'
import loginimage from '../assets/Image/login.svg'
import axios from '../Helpers/axios-config'
import rideimage from "../assets/Image/bike.svg"

const Header = (props) => {
  const token = useSelector((state) => state.user.token)

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const handleLogout = () => {
      localStorage.removeItem('token')
      window.location = '/'
  }

  return (
    <div className='flex justify-between w-full p-2 bg-slate-50 text-xl text-blue-950 font-semibold'>
      
      <div>
        <Link to='/'>
          <Title />
        </Link>
      </div>

      <>
        <ul className='flex justify-between gap-12'>

          <Link to='/allrides'>
            <h1>All Rides</h1>
          </Link>

          <Link to='/profile'>
            <h1>Profile</h1>
          </Link>

          {token ? (
            <Link to='/'>
              <li>
                <img
                  src={logout}
                  alt=''
                  className='w-14 h-8'
                  onClick={handleLogout}
                />
              </li>
            </Link>
          ) : (
            <Link to='/allrides'>
              <li>
                <img src={loginimage} alt='' className='w-8' />
              </li>
            </Link>
          )}
        </ul>
      </>
    </div>
  )
}

export default Header
