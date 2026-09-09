import React from 'react'
import { useRole } from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingDashboard from '../utilits/LoadingDashboard';

const RiderRoute = ({ children }) => {
    const { users, isLoading } = useRole();
    const { user, loading } = useAuth();
    const loaction = useLocation();
    // console.log(users)
    if (loading || isLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: loaction.pathname }}
                replace
            >
            </Navigate>
        )
    }
    if (users.role !== "rider") {
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

export default RiderRoute