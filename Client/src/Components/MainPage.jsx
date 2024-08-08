import React from 'react'
import Ride from "../Components/Ride"
import Map from "../Components/Map"

const MainPage = () => {
  return (
    <div className='flex justify-between h-full gap-2'>
        <div>
            <Ride />
        </div>
        <div>
            <Map />
        </div>
    </div>
  )
}

export default MainPage