import React,{useState} from 'react'
import Ride from './Components/Ride'
import {Provider} from "react-redux"
import store from './Redux/store'
import Map from './Components/Map'
import Login from './Components/Login'
import UserRegister from './Components/UserRegister'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import HomeLayout from './Components/HomeLayout'
import DriverRegister from './Components/DriverRegister'
import DriverLogin from './Components/DriverLogin'
import MyRides from './Components/MyRides'
import MainPage from './Components/MainPage'

const App = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter >
        <Routes>

          <Route path = "/" element = {<HomeLayout />} >
              <Route path = "/" element = {<MainPage />} />
              <Route path = "/map" element = {<Map />} />
              <Route path = "/userregister" element = {<UserRegister />} />
              <Route path = "/userlogin" element = {<Login />} />
              <Route path = "/driverregister" element = {<DriverRegister />} />
              <Route path = "/driverlogin" element = {<DriverLogin />} />
              <Route path = "/myrides" element = {<MyRides />} />
              {/* <Route path = "/userlogin" element = {<Login />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App