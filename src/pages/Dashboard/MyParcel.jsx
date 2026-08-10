import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../hook/useAuth'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdOutlinePageview } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ErrorPage from '../../utilits/ErrorPage';

const MyParcel = () => {
    const { user } = useAuth();
    const axiousInstence = useAxiousSecoure();
    const { data: parcels = [], isLoading, error, refetch } = useQuery({
        queryKey: ["parcels", user.email],
        queryFn: async () => {
            const res = await axiousInstence.get(`/parcels?email=${user.email}`);
            return res.data
        }
    })
    console.log(error , parcels , isLoading)
    if(isLoading) {
        return <div>Loading.........</div>
    }
    if(error) {
        return <ErrorPage></ErrorPage>
    }

    const handelPayment = async (parcel) => {
        const paymantInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
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
            refetch()
            axiousInstence.delete(`/parcels/${parcel._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        if (result.isConfirmed) Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
        });
    }
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
                            <th className='text-center'>Cost</th>
                            <th className='text-center'>Payment Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* row 1 */}
                        {
                            parcels?.map((parcel, i) => <tr key={parcel._id}>
                                <th className='text-center'>{i + 1}</th>
                                <td className='text-center'>{parcel.parcelName}</td>
                                <td className='text-center'>{parcel.cost}</td>
                                <td className='text-center'><button onClick={() => handelPayment(parcel)} className={` btn ${parcel.payment === "paid" ? "text-green-600" : "bg-primary"}`}>{ parcel.payment}</button></td>
                                <td>
                                    <div className='flex justify-center items-center'>
                                        <button
                                            onClick={() => handelDelete(parcel)}
                                            data-tip="Delete" className='btn'><FaRegTrashCan /></button>
                                        <button data-tip="View" className='btn mx-2'><MdOutlinePageview /></button>
                                        <button data-tip="Edit" className='btn'><FiEdit /></button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyParcel