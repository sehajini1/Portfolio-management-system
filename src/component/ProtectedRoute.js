import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to the login page if there's no token
    return <Navigate to="/" replace />;
  }

  // If there's a token, render the child route
  return <Outlet />;
};

export default ProtectedRoute;