import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'
import Swal from 'sweetalert2';
import {  LuUserRoundCheck, LuUserRoundSearch } from 'react-icons/lu';
import { CiTrash } from 'react-icons/ci';
import { FaUserLargeSlash } from 'react-icons/fa6';

export const RidersApproval = () => {
  const [viewRider, setViewRider] = useState(null)
  const axiousInstence = useAxiousSecoure();
  const modalRef = useRef();
  const { data: rider = [], error, isLoading, refetch } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const result = await axiousInstence.get('/riders')
      return result.data
    }
  })

  const deleteRiderApplication = (rider) => {

    Swal.fire({
      title: "Are you sure?",
      text: "If you delete this application  , application info delete from database !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this application!"
    }).then((result) => {
      if (result.isConfirmed)
        axiousInstence.delete(`/riders/${rider?._id}`)
      refetch()
        .then(res => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Application has been deleted.",
              icon: "success"
            });
          }
        })
    });
  }
  const viewRiderApplicationInfo = (riderInfo) => {
    setViewRider(riderInfo)
    modalRef.current.showModal()
  }

  const handelRiderStatus = (rider, status) => {
    const updatedInfo = { status, email: rider.email }

    Swal.fire({
      title: "Are you sure?",
      text: ` I want to ${status} Mr.${rider.name} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes i will change status`
    }).then((result) => {
      if (result.isConfirmed)
        axiousInstence.patch(`/riders/${rider._id}`, updatedInfo)
          .then(res => {
            if (res.data.modifiedCount) {
              refetch()
              Swal.fire({
                title: "Rider Status Updated!",
                text: `${rider.name}'s status updated to ${status}`,
                icon: "success"
              });
            }
          })

    });

  }

  const approveRider = (rider) => {
    if (rider.status === "apprroved") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Already Approved this account",
      });
    }
    handelRiderStatus(rider, "apprroved")
  }
  const rejectedRider = (rider) => {
    if (rider.status === "rejected") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Already Reject this account",
      });
    }
    handelRiderStatus(rider, "rejected")
  }


  console.log(rider)
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Work Status</th>
            <th>District</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            rider.map((res, index) =>
              <tr key={res._id}>
                <td>{index + 1}</td>
                <td>{res.name}</td>
                <td>{res.email}</td>
                <td
                  className={res.status === "apprroved" ? "text-green-500" : "text-red-500"}>
                  {res.status}</td>
                <td>{res.workStatus}</td>
                <td>{res.district}</td>
                <td className='flex justify-center items-center gap-1 md:gap-2'>
                  <button
                    onClick={() => approveRider(res)}
                    className='btn'><LuUserRoundCheck /></button>
                  <button
                    onClick={() => rejectedRider(res)}
                    className='btn'><FaUserLargeSlash /></button>
                  <button
                    onClick={() => {
                      viewRiderApplicationInfo(res)
                    }}
                    className='btn'><LuUserRoundSearch /></button>
                  <button
                    onClick={() => deleteRiderApplication(res)}
                    className='btn'><CiTrash /></button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="overflow-x-auto">
            <h3 className="font-bold text-2xl mb-5">
              Rider Application Information
            </h3>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{viewRider?.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{viewRider?.email}</td>
                </tr>

                <tr>
                  <th>Phone</th>
                  <td>{viewRider?.phone}</td>
                </tr>

                <tr>
                  <th>Region</th>
                  <td>{viewRider?.region}</td>
                </tr>

                <tr>
                  <th>District</th>
                  <td>{viewRider?.district}</td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>{viewRider?.address}</td>
                </tr>

                <tr>
                  <th>NID</th>
                  <td>{viewRider?.nid}</td>
                </tr>

                <tr>
                  <th>Bike Brand</th>
                  <td>{viewRider?.bikeBrand}</td>
                </tr>

                <tr>
                  <th>Bike Model</th>
                  <td>{viewRider?.bikeModel}</td>
                </tr>

                <tr>
                  <th>Bike Registration</th>
                  <td>{viewRider?.bikeRegistration}</td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      className={
                        viewRider?.status === "apprroved"
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {viewRider?.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  )
}
