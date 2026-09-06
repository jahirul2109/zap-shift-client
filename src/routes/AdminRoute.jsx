import React from 'react'
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import { useRole } from '../hook/useRole';
import LoadingDashboard from '../utilits/LoadingDashboard';

const AdminRoute = ({ children }) => {
  const { users, isLoading } = useRole();
  const { user, loading } = useAuth();
  const loaction = useLocation();
  console.log(users)
  if (loading || isLoading || !user) {
    return <LoadingDashboard></LoadingDashboard>
  }

  if (users.role !== "admin") {
    return (
      <Navigate
        to="/login"
        state={loaction.pathname}
      >
      </Navigate>
    )
  }

  return children
}

export default AdminRoute