import React from 'react'
import { FcPositiveDynamic } from "react-icons/fc";
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import AnimatedNumber from '../../utilits/AnimatedNumber';
import Charts from '../../utilits/Charts';
import { Link } from 'react-router';
export const UserDashboard = () => {
  const axiousInstence = useAxiousSecoure();
  const { user } = useAuth();
  const { data: parcelData = [] } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiousInstence.get(`/user-stats/${user?.email}`);
      return res.data
    }
  })


  const status = parcelData[0]?.status;
  // console.log(status)
  console.log(parcelData[0]?.status)
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
        <Link to='/send-parcel'>
          <button className=' md:px-4 md:py-2 px-2 py-1 rounded-xl font-semibold bg-primary text-secondary md:text-xl'>+ Create Parcel</button>
        </Link>
      </div>
      <div className='w-full'>
        <Charts data={status}></Charts>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-3 items-center'>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Total Parcel</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber value={parcelData[0]?.total[0]?.count} />
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Total Paid Ammount</h1>
            <h1 className='text-2xl font-bold'>
              $<AnimatedNumber value={
                parcelData[0]?.total[0]?.totalCost
              }></AnimatedNumber>
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Delivered Parcel</h1>
            <h1 className='text-2xl font-bold'>              <AnimatedNumber
              value={
                status?.find(parcel => parcel._id === "delivered")?.count
              }
            ></AnimatedNumber></h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Pending Parcel</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber
                value={
                  status?.find(parcel => parcel._id === "pending_pickup")?.count
                }
              ></AnimatedNumber>
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
      </div>
    </div>
  )
}
