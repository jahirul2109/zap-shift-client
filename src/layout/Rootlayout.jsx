import React from 'react'
import Navbar from '../utilits/Navbar'
import { Outlet } from 'react-router'
import Footer from '../utilits/Footer'

const Rootlayout = () => {
  return (
    <div className='py-8 px-5 md:py:10 md:px-10'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Rootlayout