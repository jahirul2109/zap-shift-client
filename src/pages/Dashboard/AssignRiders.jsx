import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'
import Swal from 'sweetalert2';
import { CgClose } from 'react-icons/cg';

const AssignRiders = () => {
  const axiosInstence = useAxiousSecoure();
  const [selectedParcel, setSelectedParcel] = useState(null)
  const ridersModal = useRef();
  const { data: parcel = [], refetch: parcelRefatch, isLoading } = useQuery({
    queryKey: ['parcels', 'pending_pickup'],
    queryFn: async () => {
      const result = await axiosInstence.get(`/parcels?deliveryStatus=pending_pickup`);
      return result.data
    }
  })

  const { data: riders, refetch: riderRefetch, error: ridersError, isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistrict],
    queryFn: async () => {
      const result = await axiosInstence.get(`/riders?workStatus=available&district=${selectedParcel?.senderDistrict}`)
      return result.data
    },
    enabled: !!selectedParcel?.senderDistrict
  })

  console.log(riders)
  const findRider = (parcel) => {
    ridersModal.current.showModal()
    setSelectedParcel(parcel)
  }

  const { mutate: assigningRider, isPending: assinging } = useMutation({
    mutationFn: async (rider) => {
      const updateInfo = {
        riderEmail: rider.email,
        riderName: rider.name,
        deliveryStatus: "rider_assigned",
        trackingId : selectedParcel.trackingId
      }

      const result = await axiosInstence.patch(`/parcels/${selectedParcel._id}/assigning`, updateInfo)
      return result.data;
    },
    onSuccess: () => {
      parcelRefatch();
      riderRefetch();
      ridersModal.current.close();
      setSelectedParcel(null);
      Swal.fire({
        title: "Assign to a rider successfully!",
        icon: "success",
        draggable: true
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error.message}`
      });
    }

  })
  return (
    <div>
      <h1>{parcel.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Delivery Ammount</th>
              <th>Delivery Status</th>
              <th>District</th>
              <th>Coustomer email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcel.map((res, i) => <tr key={res._id}>
              <td>{i + 1}</td>
              <td>{res.parcelName}</td>
              <td>{res.cost}</td>
              <td>{res.deliveryStatus}</td>
              <td>{res.senderDistrict}</td>
              <td>{res.senderEmail}</td>
              <td>
                <button
                  onClick={() => findRider(res)}
                  className='btn btn-primary text-secondary'>Find Rider</button>
              </td>
            </tr>)}

          </tbody>
        </table>
      </div>
      <dialog ref={ridersModal} className="modal">
        <div className="modal-box w-7/12">
          <h3 className="font-bold text-lg">Delivery Assign to Rider</h3>
          <div className="modal-action flex justify-center">
            <form method="dialog">
              <button className=" text-2xl text-secondary absolute top-5 right-5 cursor-pointer "><CgClose /></button>
            </form>
            {riders?.length > 0 ? <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table table-zebra">
                {/* head */}
                <thead >
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Work Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders?.map((rider, i) => <tr key={rider._id}>
                    <td>{i + 1}</td>
                    <td>{rider.name}</td>
                    <td>{rider.district}</td>
                    <td>{rider.workStatus}</td>
                    <td>
                      <button
                        onClick={() => {
                          assigningRider(rider)
                        }}
                        className='btn  btn-primary text-secondary'>
                        Assign Rider
                      </button>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div> : <h1 className=' flex justify-center text-secondary'>Rider Not Available in this time</h1>}
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AssignRiders