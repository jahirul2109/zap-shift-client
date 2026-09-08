import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuth from '../../hook/useAuth'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdOutlinePageview } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ErrorPage from '../../utilits/ErrorPage';
import { NavLink } from 'react-router';
import LoadingDashboard from '../../utilits/LoadingDashboard';
import { useRole } from '../../hook/useRole';
import { useRef, useState } from 'react';

export const ParcelInfoForAdmin = () => {
    const { users } = useRole()
    const [viewParcel, setViewParcel] = useState(null)
    const modalRef = useRef();
    const axiousInstence = useAxiousSecoure();
    const { data: parcels = [], isLoading: parcelsLoading, error: parcelsError } = useQuery({
        queryKey: ["parcelsInfo", users?.role],
        queryFn: async () => {
            const res = await axiousInstence.get(`/parcels/admin`);
            return res.data
        }
        ,
        enabled: users?.role === "admin"
    })
    const queryClient = useQueryClient();
    const deleteParcelMutation = useMutation({
        mutationFn: async (id) => {
            const parcel = await axiousInstence.delete(`/parcels/${id}`)
            return parcel.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['parcelsInfo', users?.role]
            })

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        },
        onError: () => {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete parcel.",
                icon: "error"
            });
        }
    })

    const handelViewParcel = (parcelInfo) => {
        setViewParcel(parcelInfo)
        modalRef.current.showModal()
    }
    if (parcelsLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }
    if (parcelsError) {
        return <ErrorPage></ErrorPage>
    }

    const handelPayment = async (parcel) => {
        const paymantInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            trackingId: parcel.trackingId,
            coustomerEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }
        console.log(paymantInfo)
        //    const res = await axiousInstence.post(`/create_checkout_session`, paymantInfo) ;
        const res = await axiousInstence.post(`/payment_checkout_session`, paymantInfo);
        console.log(res.data.url)
        window.location.href = res.data.url
    }

    const handelDelete = (parcel) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                deleteParcelMutation.mutate(parcel._id)
        });
    }
    const formatStatus = (status) => {
        if (!status) return "N/A";
        return status
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    console.log(parcels.length)
    return (
        <div className='py-10'>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Ammount</th>
                            <th className='text-center'>Receving District</th>
                            <th className='text-center'>Delivery Status</th>
                            <th className='text-center'>Tracikg Id</th>
                            <th className='text-center'>Coustomers Email</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* row 1 */}
                        {
                            parcels?.map((parcel, i) => <tr key={parcel._id}>
                                <th className='text-center'>{i + 1}</th>
                                <td className='text-center'>{parcel.parcelName}</td>
                                <td className='text-center'>${parcel.cost}</td>
                                <td className='text-center'>
                                    {parcel.senderDistrict
                                    }
                                </td>
                                <td className='text-center'>{parcel.deliveryStatus && formatStatus(parcel.deliveryStatus)}</td>
                                <td className='text-center'>
                                    <NavLink to={`/tarck-parcel/${parcel.trackingId}`}>
                                        {parcel.trackingId}
                                    </NavLink>
                                </td>
                                <td>
                                    {parcel.senderEmail}
                                </td>
                                <td>
                                    <div className='flex justify-center items-center'>
                                        <button
                                            onClick={() => handelDelete(parcel)}
                                            data-tip="Delete" className='btn'><FaRegTrashCan /></button>
                                        <button data-tip="View" className='btn mx-2'
                                            onClick={() => handelViewParcel(parcel)}
                                        ><MdOutlinePageview /></button>
                                        <button data-tip="Edit" className='btn'><FiEdit /></button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="overflow-x-auto">
                        <h3 className="font-bold text-secondary text-center text-2xl mb-5">
                            Parcel Information
                        </h3>
                        <table className="table table-zebra w-full border-2 border-gray-300 rounded-md px-2 py-1">
                            <tbody>
                                <p className='w-full  my-4 md:text-xl  font-bold text-secondary'>Receving Information</p>
                                <tr>
                                    <th>Coustomer Name</th>
                                    <td>{viewParcel?.senderName}</td>
                                </tr>

                                <tr>
                                    <th>Pickup address</th>
                                    <td>{viewParcel?.senderAddress}</td>
                                </tr>
                                <tr>
                                    <th>Pickup instraction</th>
                                    <td>{viewParcel?.pickupInstrc === "" ? "There are no instraction on this parcel" : viewParcel?.pickupInstrc}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{viewParcel?.senderMobile === "" ? "Not provied mobile number plz contact admin" : viewParcel?.senderMobile}</td>
                                </tr>
                                <p className='w-full  my-4 md:text-xl  font-bold text-secondary'>Delivery Information</p>
                                <tr>
                                    <th>Recevier Phone</th>
                                    <td>{viewParcel?.reciverMobile === "" ? "Not provied mobile number plz contact admin" : viewParcel?.reciverMobile}</td>
                                </tr>
                                <tr>
                                    <th>Deliverd address</th>
                                    <td>{viewParcel?.reciverAdderss}</td>
                                </tr>
                                <tr>
                                    <th>Delivery instraction</th>
                                    <td>{viewParcel?.deliveryInstr === "" ? "There are no instraction on this parcel" : viewParcel?.deliveryInstr}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
