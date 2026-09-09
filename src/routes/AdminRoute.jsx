import React from 'react'
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import { useRole } from '../hook/useRole';
import LoadingDashboard from '../utilits/LoadingDashboard';

const AdminRoute = ({ children }) => {
  const { users, isLoading } = useRole();
  const { user, loading } = useAuth();
  const userLoaction = useLocation();
  if (loading || isLoading) {
    return <LoadingDashboard></LoadingDashboard>
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: userLoaction.pathname
        }}
        replace
      >
      </Navigate>
    )
  }
  if (users.role !== "admin") {
    return (
      <Navigate
        to="/login"
        replace
      >
      </Navigate>
    )
  }

  return children
}

export default AdminRoute