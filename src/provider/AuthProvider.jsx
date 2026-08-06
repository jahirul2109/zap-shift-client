import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import auth from '../firebase/firebase.config'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const loginWithEmailPassword = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const profileUpdate = (profile) => {
        return updateProfile(user.currentUser, profile)
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    const socialLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        socialLogin,
        loginWithEmailPassword,
        logout,
        loading,
        profileUpdate
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
