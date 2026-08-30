import React from 'react'
import { useRole } from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const RiderRoute = () => {
    const { users, isLoading } = useRole();
    const { user, loading } = useAuth();
    const loaction = useLocation();
    console.log(users)
    if (loading || isLoading || !user) {
        return <div>Loading.........</div>
    }

    if (users.role !== "rider") {
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

export default RiderRoute