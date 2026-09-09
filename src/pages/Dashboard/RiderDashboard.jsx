import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { useAxiousSecoure } from "../../hook/useAxiousSecoure";
import { useRole } from "../../hook/useRole";
import LoadingDashboard from "../../utilits/LoadingDashboard";
import { FcPositiveDynamic } from "react-icons/fc";
import { Link, NavLink } from "react-router";
import AnimatedNumber from "../../utilits/AnimatedNumber";
import Charts from "../../utilits/Charts";


const RiderDashboard = () => {
  const { users } = useRole();
  const axiousInstence = useAxiousSecoure();
  const { user } = useAuth();
  const { data: parcels = [], isLoading, error } = useQuery({
    queryKey: ["rider-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiousInstence.get(`/rider-stats/${user?.email}`);
      return res.data
    }
  })

  const deliverdItem = parcels.find((parcel) => parcel._id === "delivered")
  const status = parcels;
  // console.log(status)
  if (isLoading) {
    return <LoadingDashboard />
  }
  if (users?.role !== "rider") {
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
        <NavLink to='/dashboard/pending-order'
          className=' md:px-4 md:py-2 px-2 py-1 rounded-xl font-semibold bg-primary text-secondary md:text-xl'
        >
          Find New Order</NavLink>
      </div>
      <div className='w-full'>
        {
          status?.length > 0 ? <Charts data={status}></Charts> : <div className='h-[350px] flex justify-center items-center '><h1 className='text-2xl md:text-4xl text-secondary font-extrabold'>No data found</h1></div>
        }
      </div>
      <div className='grid md:grid-cols-4 grid-cols-1 gap-3 items-center'>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Total earn</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber value={Math.floor((deliverdItem?.count * 40) + deliverdItem?.cost * 0.05)} />
            </h1>
            {/* <h1 className='text-xl text-base-content'>Full Year</h1> */}
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
        <div className='flex justify-between items-center h-28 md:h-full shadow-md p-3 rounded-xl bg-white'>
          <div className=''>
            <h1 className='text-xl text-base-content'>Cancelled Order</h1>
            <h1 className='text-2xl font-bold'>
              <AnimatedNumber value={
               0
              }></AnimatedNumber>
            </h1>
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
                deliverdItem?.count
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
                  status?.find(parcel => parcel._id === "pending_pickup")?.count
                }
              ></AnimatedNumber>
            </h1>
          </div>
          <div>
            < FcPositiveDynamic className='text-5xl text-primary' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderDashboard