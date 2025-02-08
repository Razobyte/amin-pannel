import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function AuthRoute() {
  // Replace this with your actual authentication logic
  const isAuthenticated = false // Example: Check for a token in localStorage

  if (isAuthenticated) { 
    return <Outlet />;
  } else {
    return <Navigate to="/admin" />;
  }
}

export default AuthRoute;
