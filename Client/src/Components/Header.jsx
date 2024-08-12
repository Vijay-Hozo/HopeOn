import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Title from '../assets/Title';
import {Link} from "react-router-dom"
import addicon from "../assets/Image/add.svg"
import profile from "../assets/Image/profile.svg"
import logout from "../assets/Image/logout.svg"

const Header = (props) => {
    const rides = useSelector(state => state.ride.rides);
    const token = useSelector((state) => state.user.token);
    console.log(token);
    
    console.log(rides);

    useEffect(()=>{
        if(token){
            // props.history.push("/userlogin")
            console.log(token);
        }
    },[token])
    
  return (
    <div className='flex justify-between w-full p-4 text-xl text-blue-600 font-semibold'>
        <div>
            <Link to="/">logo</Link>
        </div>
        <div>
            <Title/>
        </div>
        <div className=''>
            <ul className='flex justify-between gap-4'>
                <div className='flex'>
                        <Link to="/driverride"><li><img src={addicon} alt="addicon" className="w-10 h-10" /></li></Link>
                        <Link to ="/driverride"><h1>Post Ride</h1></Link>
                </div>
               
                <Link to="/allrides"><li>All Rides</li></Link>
                {
                    token ?
                    <Link to="/profile"><li><img src={profile} alt="profile" className="w-8 h-8" /></li></Link>
                    :
                    <li></li>
                }
                 {
                    token ? 
                    <Link to="/logout"><li><img src={logout} alt="" className='w-14 h-8' /></li></Link>
                    :
                    <Link to="/userlogin"><li>Login</li></Link>
                    
                }
            </ul>
        </div>
    </div>
  )
}

export default Header