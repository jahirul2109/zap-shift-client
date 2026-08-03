import React from 'react'
import Navbar from '../utilits/Navbar'
import { Outlet } from 'react-router'
import Footer from '../utilits/Footer'

const Rootlayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Rootlayout