import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("drivertoken");
  return token ? 
  <Outlet /> : <Navigate to = {`/driverlogin?return_to=${location.pathname}`} />
}

export default ProtectedRoute