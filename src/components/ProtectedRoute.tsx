import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/authStore'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, checkTokenExpiration, logout } = useAuthStore()

  useEffect(() => {
    // Check token expiration on mount and whenever isAuthenticated changes
    if (checkTokenExpiration()) {
      logout() // Log out if token is expired or invalid
    }
  }, [isAuthenticated, checkTokenExpiration, logout])

  if (!isAuthenticated) {
    return <Navigate to="/access-denied" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
