import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Title from '../assets/Title'
import { Link } from 'react-router-dom'
import addicon from '../assets/Image/add.svg'
import profile from '../assets/Image/profile.svg'
import logout from '../assets/Image/logout.svg'
import loginimage from '../assets/Image/login.svg'
import requestimage from "../assets/Image/request.svg"

const DriverHeader = (props) => {
  const drivertoken = useSelector((state) => state.driver.drivertoken)

  const handleLogout = () => {
      localStorage.removeItem('driverToken')
      window.location = '/driverlogin'
  }

  return (
    <div className='flex justify-between w-full p-2 bg-slate-50 text-xl text-blue-600 font-semibold'>
      
      <div>
        <Link to='/'>
          <Title />
        </Link>
      </div>

      <>
        <ul className='flex justify-between gap-12'>

            <Link to='/driverride'>
                <img src={addicon} alt='addicon' className='w-12 h-10' />
            </Link>

            <Link to='/request'>
                <img src={requestimage} alt='addicon' className='w-10 h-10' />
            </Link>

          <Link to='/profile'>
              <img src={profile} alt='profile' className='w-8 h-8' />
          </Link>

          {drivertoken ? (
            <Link to='/'>
                <img
                  src={logout}
                  alt=''
                  className='w-14 h-8'
                  onClick={handleLogout}
                />
            </Link>
          ) : (
            <Link to='/allrides'>
                <img src={loginimage} alt='' className='w-8' />
            </Link>
          )}
        </ul>
      </>
    </div>
  )
}

export default DriverHeader
