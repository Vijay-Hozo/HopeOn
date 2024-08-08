import React from 'react'
import { useSelector } from 'react-redux';
import Title from '../assets/Title';

const Header = (props) => {
    const rides = useSelector(state => state.ride.rides);
    console.log(rides);
    
  return (
    <div className='flex justify-between w-full p-4 text-xl'>
        <div>
            logo
        </div>
        <div>
            <Title/>
        </div>
        <div className=''>
            <ul className='flex justify-between gap-4'>
                <li>Driver</li>
                <li>Login</li>
                <li>My rides:{rides.length}</li>
            </ul>
        </div>
    </div>
  )
}

export default Header