import React, { useRef } from 'react'
import { BsBox, BsReceiptCutoff } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { FaUsersBetweenLines } from 'react-icons/fa6'
import { MdAssignmentTurnedIn, MdDirectionsBike, MdOutlineFindInPage } from 'react-icons/md'
import { Link, NavLink, Outlet } from 'react-router'
import { useRole } from '../hook/useRole'
import logoImg from '../assets/logo.png'
import './dashboard.css'
import useAuth from '../hook/useAuth'
import { IoIosLogOut } from 'react-icons/io'
export const Dashboardlayout = () => {
  const { user, logout } = useAuth()
  const { users } = useRole();
  const logutModal = useRef(null)

  const handelLogout = () => {
    logout()
      .then(() => {
        console.log("logout")
      })
  }
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full flex justify-between items-center bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4 flex justify-between items-center gap-2">
            <img
              className='w-8 h-8 rounded-full'
              src={users?.photoURL} alt="" />
            <div>
              <h1 className='text-secondary  font-semibold'>{user?.displayName}</h1>
              <p className='text-base-content'>{users?.role}</p>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className='min-h-[90vh] bg-white'>
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-1">
            {/* List item */}
            <li className='  justify-center'>
              <Link to="/" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" >
                <img src={logoImg} alt="" />
              </Link>
            </li>
            <h1 className='uppercase text-secondary font-bold'>Menu</h1>
            <li className=''>
              <NavLink

                to="/dashboard" end className="is-drawer-close:tooltip is-drawer-close:tooltip-right h-10 flex " data-tip="Homepage">
                {/* Home icon */}
                <div className='text-xl'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                </div>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
            {/* List item */}
            {
              users?.role !== "admin" &&
              <li className=' justify-center'>
                <NavLink to="/dashboard/my-parcel" className="is-drawer-close:tooltip   is-drawer-close:tooltip-right h-10 flex" data-tip="My Parcel">
                  {/* Parcel icon */}
                  <BsBox />
                  <span className="is-drawer-close:hidden">My Parcel</span>
                </NavLink>
              </li>
            }
            <li className='  justify-center'>
              <NavLink to="/dashboard/payment-history" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Payment History">
                {/* Parcel icon */}
                <FaHistory />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            <li className='  justify-center'>
              <NavLink to="/dashboard/search-trackingId" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Tracking Parcel">
                {/*  icon */}
                <MdOutlineFindInPage />
                <span className="is-drawer-close:hidden">Track Parcel Id</span>
              </NavLink>
            </li>
            {
              users?.role === "admin" &&
              <>
                <li className='  justify-center'>
                  <NavLink to="/dashboard/rider-assign" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Riders Assign">
                    {/* assign icon */}
                    <MdAssignmentTurnedIn />
                    <span className="is-drawer-close:hidden">Riders Assign</span>
                  </NavLink>
                </li>
                <li className='  justify-center'>
                  <NavLink to="/dashboard/rider-approver" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Riders Approval">
                    <MdDirectionsBike />
                    <span className="is-drawer-close:hidden">Riders Approval</span>
                  </NavLink>
                </li>
                <li className='  justify-center'>
                  <NavLink to="/dashboard/user-management" className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="User Management">
                    {/* Parcel icon */}
                    <FaUsersBetweenLines />
                    <span className="is-drawer-close:hidden">User Management</span>
                  </NavLink>
                </li>
              </>
            }

            {
              users?.role === "rider" &&
              <li className='  justify-center'>
                <NavLink
                  className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Order status"
                  to='/dashboard/pending-order'>
                  {/* icon */}
                  <BsReceiptCutoff />
                  <span className="is-drawer-close:hidden">Order Status</span>
                </NavLink>
              </li>
            }

            {/* List item */}
            <h1 className='uppercase text-secondary font-bold'>Genarel</h1>
            <li className='  justify-center'>
              <button className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
            <li
              onClick={() => logutModal.current.showModal()}
              className='  justify-center'>
              <a
                className="is-drawer-close:tooltip  is-drawer-close:tooltip-right h-10 flex" data-tip="Order status"
              >
                {/* icon */}
                <IoIosLogOut className='text-xl' />
                <span className="is-drawer-close:hidden">Logout</span>
              </a>
            </li>
          </ul>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_3" ref={logutModal} className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-center text-lg">Are you sure Logout!</h3>
              <div className='flex justify-between gap-3 items-center mt-10'>
                <button onClick={handelLogout} className='rounded-md cursor-pointer px-3 md:px-5 py-1 md:py-2 bg-primary text-secondary'>Yes</button>
                <button onClick={() => logutModal.current.close()} className='rounded-md cursor-pointer px-3 md:px-5 py-1 md:py-2 bg-amber-500 text-secondary'>No</button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  )
}
