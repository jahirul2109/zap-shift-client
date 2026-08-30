import React from 'react'
import { useRole } from '../../hook/useRole'
import { AdminDashboard } from './AdminDashboard'
import RiderDashboard from './RiderDashboard'
import { UserDashboard } from './UserDashboard'

export const UserBaseDashboard = () => {
    const { users } = useRole()

    if (users?.role === "admin") {
        return (<AdminDashboard></AdminDashboard>)
    }
    if (users?.role === "rider") {
        return (<RiderDashboard></RiderDashboard>)
    }
    return (
        <div>
            <div>
                <UserDashboard></UserDashboard>
            </div>
        </div>
    )
}
