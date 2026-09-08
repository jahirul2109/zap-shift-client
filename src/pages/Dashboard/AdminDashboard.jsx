import React from 'react'
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { useAxiousSecoure } from "../../hook/useAxiousSecoure";
import { useRole } from "../../hook/useRole";
import LoadingDashboard from "../../utilits/LoadingDashboard";
import { FcPositiveDynamic } from "react-icons/fc";
import { Link, NavLink } from "react-router";
import AnimatedNumber from "../../utilits/AnimatedNumber";
import Charts from "../../utilits/Charts";

export const AdminDashboard = () => {
  const { users } = useRole();
  const axiousInstence = useAxiousSecoure();
  const { user } = useAuth();
  const { data: parcels = [], isLoading, error } = useQuery({
    queryKey: ["rider-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiousInstence.get(`/admin-stats/${user?.email}`);
      return res.data
    }
  })

  const deliverd = parcels.find((parcel) => parcel._id === "delivered");
  const assign = parcels.find((parcel) => parcel._id === "rider_assigned");
  const intransite = parcels.find((parcel) => parcel._id === "rider_ariving");
  const pending = parcels.find((parcel) => parcel._id === "pending_pickup");
  const pickup = parcels.find((parcel) => parcel._id === "picked_up");
  const totalParcels = parcels.reduce((sum, item) => {
    return sum + item.count
  }, 0)
  const status = parcels;
  // console.log(status)
  if (isLoading) {
    return <LoadingDashboard />
  }
  if (users?.role !== "admin") {
    return "Dashboard"
  }
  return (
    <div className='p-5 md:px-10 md:py-5'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl md:text-4xl font-bold text-secondary my-3'>
            Dashboard overview
          </h1>
          <p className='text-base-content sm:text-xs md:text-xl'>
            You can access all your data and information from anywhere.
          </p>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Total earn ammount ({deliverd?.count})</h1>
            <h1 className='text-2xl font-bold'>
              $<AnimatedNumber value={Math.floor(deliverd?.cost - ((deliverd?.count * 40) + deliverd?.cost * 0.05))} />
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
        </div>
      </div>
      <div className='w-full'>
        {
          status?.length > 0 ? <Charts data={status}></Charts> : <div className='h-[350px] flex justify-center items-center '><h1 className='text-2xl md:text-4xl text-secondary font-extrabold'>No data found</h1></div>
        }
      </div>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-3 items-center'>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Total Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber value={
                totalParcels
              }></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Cancelled Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber value={0} />
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Delivered order</h1>
            <h1 className='text-2xl font-bold'>              <AnimatedNumber
              value={
                deliverd?.count
              }
            ></AnimatedNumber></h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Pending Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  pending?.count
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Intransite</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  intransite?.count
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        {/* <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Cancelled Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  0
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div> */}
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Rider assign</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  assign?.count
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        {/* <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Pending Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  pickup?.count
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div> */}
      </div>
    </div>
  )
}
