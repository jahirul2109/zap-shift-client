import React from 'react'
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import { useRole } from '../hook/useRole';

const AdminRoute = ({ children }) => {
  const {users , isLoading} = useRole();
  const { user, loading } = useAuth();
  const loaction = useLocation();
  if (loading || isLoading) {
    return <div>Loading.........</div>
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