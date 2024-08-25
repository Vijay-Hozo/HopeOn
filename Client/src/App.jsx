import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import UserRegister from "./Components/UserRegister";
import DriverRegister from "./Components/DriverRegister";
import DriverLogin from "./Components/DriverLogin";
import Allrides from "./Components/Allrides";
import DriverRide from "./Components/DriverRide";
import Profile from "./Components/Profile";
import Request from "./Components/Request";
import ProtectedRoute from "./Components/ProtectedRoute";
import DriverProfile from "./Components/DriverProfile";
import Landingpage from "./Components/Landingpage";
import DriverProtectedRoute from "./Components/DriverProtectedRoute";
import { login } from "./Redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "./Components/Footer";
import ResetPassword from "./Components/ResetPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* <Route path = "/" element = {<HomeLayout />} > */}

          <Route path="/" element={<Landingpage />} />
          {/* <Route path = "/ride" element = {<Ride />} /> */}
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/driverregister" element={<DriverRegister />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/allrides" element={<Allrides />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<DriverProtectedRoute />}>
            <Route path="/driverride" element={<DriverRide />} />
            <Route path="/driverprofile" element={<DriverProfile />} />
            <Route path="/request" element={<Request />} />
          </Route>

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
