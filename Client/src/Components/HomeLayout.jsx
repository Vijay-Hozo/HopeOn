import React from 'react'
import { Outlet } from 'react-router-dom'
import Landingpage from './Landingpage'

const HomeLayout = () => {
  return (
    <div>
        <Landingpage />
        {/* <Footer /> */}
        <Outlet />
    </div>
  )
}

export default HomeLayout