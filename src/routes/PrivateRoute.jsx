import React from 'react'
import useAuth from '../hook/useAuth'
import { Navigate, useLocation, useNavigate } from 'react-router';
import LoadingDashboard from '../utilits/LoadingDashboard';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const loaction = useLocation();
    if (loading) {
        return <LoadingDashboard></LoadingDashboard>
    }

    if (!user) {
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

export default PrivateRoute