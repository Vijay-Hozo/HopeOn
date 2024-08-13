import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation();
  console.log(location)
  const token = localStorage.getItem("token");
  return token ? 
  <Outlet /> : <Navigate to = {`/userlogin?return_to=${location.pathname}`} />
}

export default ProtectedRoute