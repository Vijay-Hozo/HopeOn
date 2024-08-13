import React,{useEffect, useState} from 'react'
import {Provider, useDispatch} from "react-redux"
import Login from './Components/Login'
import UserRegister from './Components/UserRegister'
import HomeLayout from './Components/HomeLayout'
import DriverRegister from './Components/DriverRegister'
import DriverLogin from './Components/DriverLogin'
// import MainPage from './Components/MainPage'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allrides from './Components/Allrides'
import { login } from './Redux/userSlice'
import Ride from './Components/Ride'
import DriverRide from './Components/DriverRide'
import Profile from './Components/Profile'
import Request from './Components/Request'
import ProtectedRoute from './Components/ProtectedRoute'


const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        dispatch(login(token));
    }
  },[dispatch]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter >
        <Routes>

          <Route path = "/" element = {<HomeLayout />} >
              <Route path = "/" element = {<Ride />} />
              <Route path = "/userregister" element = {<UserRegister />} />
              <Route path = "/userlogin" element = {<Login />} />
              <Route path = "/driverregister" element = {<DriverRegister />} />
              <Route path = "/driverlogin" element = {<DriverLogin />} />
              <Route path = "/driverride" element = {<DriverRide />} />

              <Route element={<ProtectedRoute/>}>
                  <Route path = "/allrides" element = {<Allrides />} />
              </Route>

                  <Route path = "/profile" element = {<Profile />} />
              <Route path = "/notification" element = {<Notification />} />
              <Route path = "/request" element = {<Request />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App