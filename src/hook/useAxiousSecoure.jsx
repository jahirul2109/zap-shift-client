import axios from "axios";
import React, { useEffect } from 'react'
import useAuth from "./useAuth";
import { useNavigate } from "react-router";



const axiousSecoure = axios.create({
  baseURL: 'http://localhost:3000'
})

export const useAxiousSecoure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptors = axiousSecoure.interceptors.request.use(async config => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config
    })
    const responseInterceptors = axiousSecoure.interceptors.response.use(res => {
      return res
    }, (err) => {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        logout()
          .then(res => {
            navigate("/login")
          })
      } 
      return Promise.reject(err);
    })
    return ()=> {
      axiousSecoure.interceptors.request.eject(requestInterceptors);
      axiousSecoure.interceptors.response.eject(responseInterceptors);
    }
  }, [user, navigate , logout])
  return axiousSecoure;
}


