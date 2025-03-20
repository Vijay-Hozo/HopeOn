/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  return token ? 
  <Outlet /> : <Navigate to = {`/userlogin?return_to=${location.pathname}`} />
}

export default ProtectedRoute