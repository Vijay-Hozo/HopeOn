import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import Title from '../assets/Title'
import { Link } from 'react-router-dom'
import addicon from '../assets/Image/add.svg'
import profile from '../assets/Image/profile.svg'
import logout from '../assets/Image/logout.svg'
import loginimage from '../assets/Image/login.svg'
import requestimage from "../assets/Image/request.svg"
import axios from 'axios'

const DriverHeader = (props) => {
  const drivertoken = useSelector((state) => state.driver.drivertoken)

  const[driver_name,setDrivername] = useState(" ");
  useEffect(()=>{ 
    getdriverbyid();
  },[]);

  const getdriverbyid = async() => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/driver`,{
        headers:{
          Authorization :`Bearer ${drivertoken}`
        }
      })
      console.log(res.data);
      setDrivername(res.data.user.driver_name);
    }catch(err){
      console.log("error");
    }
  }

  const handleLogout = () => {
      localStorage.removeItem('driverToken')
      window.location = '/driverlogin'
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

            <Link to='/driverride'>
            <button className='bg-blue-600 rounded-md p-2 text-white'>Post ride</button>
            </Link>

            <Link to='/request'>
            <button className='bg-blue-600 rounded-md p-2 text-white'>Request</button>
            </Link>

          {drivertoken ? (
            <div className='flex items-center gap-6'>
              <Link to="/driverprofile"><h1 className=''>Welcome {driver_name}</h1></Link>
              <Link to='/'>
                <img
                  src={logout}
                  alt=''
                  className='w-14 h-8'
                  onClick={handleLogout}
                />
            </Link>
            </div>
          ) : (
            <Link to='/driverlogin'>
                <img src={loginimage} alt='' className='w-8' />
            </Link>
          )}
        </ul>
      </>
    </div>
  )
}

export default DriverHeader
