import { useRole } from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingDashboard from '../utilits/LoadingDashboard';

export const UserRoute = ({ children }) => {
    const { users, isLoading } = useRole();
    const { user, loading } = useAuth();
    const loaction = useLocation();
    // console.log(users)
    if (loading || isLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }

    if (users.role !== "user") {
        return (
            <Navigate
                to="/login"
                state={{ from: loaction.pathname }}
                replace
            >
            </Navigate>
        )
    }

    return children
}
