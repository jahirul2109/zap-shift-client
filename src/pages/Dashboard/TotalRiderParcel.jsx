import React from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
import LoadingDashboard from '../../utilits/LoadingDashboard';
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const TotalRiderParcel = () =>{
  const axiousInstence = useAxiousSecoure();
  const { user } = useAuth()
  const { data: parcelCollecton = [], isPending , isLoading, error } = useQuery({
    enabled: !!user?.email,
    queryKey: ['riderStats', user?.email],
    queryFn: async () => {
      const result = await axiousInstence.get(`/parcels/${user?.email}/riderStats?limit=12`)
      return result.data
    }
  })
  if (isLoading) {
    return <LoadingDashboard></LoadingDashboard>
  }
  console.log(parcelCollecton)
  return (
    <div>
      <h1>Total Deliverd Order :  </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ProdcutId</th>
              <th>Receving District</th>
              <th>Delivered District</th>
              <th>Status</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {parcelCollecton.map((parcel, index) => <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel._id}</td>
              <td>{parcel.senderDistrict}</td>
              <td>{parcel.reciverDistrict}</td>
              <td className='uppercase'>{parcel.deliveryStatus}</td>
              <td>{Math.min(Math.floor(40 + parcel.cost * 0.05), 200)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TotalRiderParcel