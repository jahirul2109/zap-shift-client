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

const MyParcel = () => {
    const { user } = useAuth();
    const axiousInstence = useAxiousSecoure();
    const { data: parcels = [], isLoading, error, refetch } = useQuery({
        queryKey: ["parcels", user?.email],
        queryFn: async () => {
            const res = await axiousInstence.get(`/parcels/user?email=${user?.email}`);
            return res.data
        }
        ,
        enabled: !!user?.email
    })
    const queryClient = useQueryClient();
    const deleteParcelMutation = useMutation({
        mutationFn: async (id) => {
            const parcel = await axiousInstence.delete(`/parcels/${id}`)
            return parcel.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['parcels', user.email]
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
    console.log(error, parcels, isLoading)
    if (isLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }
    if (error) {
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
    // console.log(parcels.length)
    return (
        <div className=''>

            {
                parcels.length === 0 ? <span className='font-bold py-7 w-full flex justify-center items-center text-xl md:text-2xl text-secondary text-center'>No Transaction found</span>
                    :

                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr
                                    className='text-secondary bg-primary'
                                >
                                    <th className='text-center'>SL</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Ammount</th>
                                    <th className='text-center'>Payment Status</th>
                                    <th className='text-center'>Delivery Status</th>
                                    <th className='text-center'>Tracikg Id</th>
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
                                            {parcel.payment === "paid" ?
                                                <button className='btn text-green-500'>{formatStatus(parcel.payment)}</button> :

                                                <button onClick={() => handelPayment(parcel)} className={` btn btn-ghost`}>{formatStatus(parcel.payment)}</button>
                                            }
                                        </td>
                                        <td className='text-center'>{parcel.deliveryStatus && formatStatus(parcel.deliveryStatus)}</td>
                                        <td className='text-center'>
                                            <NavLink to={`/tarck-parcel/${parcel.trackingId}`}>
                                                {parcel.trackingId}
                                            </NavLink>
                                        </td>
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
            }
        </div>
    )
}

export default MyParcel