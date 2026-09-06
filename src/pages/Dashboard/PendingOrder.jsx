import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../hook/useAuth'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
const PendingOrder = () => {
    const { user } = useAuth();
    const axiosIntence = useAxiousSecoure();
    const { data: order = [], refetch: orderRefeching, isLoading, isError } = useQuery({
        queryKey: ["parcels", user?.email, "rider_assigned"],
        queryFn: async () => {
            const result = await axiosIntence.get(`/parcels/${user?.email}/rider?deliveryStatus=rider_assigned`)
            return result.data
        }
    })

    const { mutate: updateStatus = [], isPending: ariving } = useMutation({
        mutationFn: async ({ parcel, status }) => {
            console.log("Status", status)
            console.log("parcel", parcel)
            const updateInfo = {
                deliveryStatus: status,
                trackingId: parcel.trackingId,
                riderEmail: parcel.riderEmail
            }
            const result = await axiosIntence.patch(`/parcels/${parcel._id}/deliveryStatus`, updateInfo)
            return result.data
        },
        onSuccess: async () => {
            orderRefeching();
        }
    })

    const handelStatus = (parcel, status) => {
        console.log("in", status, parcel)
        updateStatus({ parcel, status })
    }
    console.log(order)
    return (
        <div>
            <h1 className='md:text-5xl text-2xl text-center font-bold text-secondary py-4'>Remaning order :{order?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Prdouct</th>
                            <th>Reciving Adderss</th>
                            <th>Pickup</th>
                            <th>Deliver Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {order?.map((res, i) => <tr key={res._id}>
                            <td>{i + 1}</td>
                            <td>{res.parcelName}</td>
                            <td>{res.senderDistrict}</td>
                            <td>
                                {
                                    res.deliveryStatus == "rider_assigned" &&
                                    <>
                                        <button
                                            disabled={ariving}
                                            onClick={() => handelStatus(res, "rider_ariving")}
                                            className='btn btn-primary text-secondary'>Accecpt</button>
                                        <button
                                            disabled={ariving}
                                            onClick={() => handelStatus(res, "cancelled")}
                                            className='btn btn-warning text-secondary ms-2'>Cancel</button>
                                    </>
                                }
                                {
                                    res.deliveryStatus === "rider_ariving" || res.deliveryStatus === "picked_up" ?
                                      <>  <button
                                            disabled={true}
                                            className='btn '
                                        >
                                            Accepted
                                        </button> <button
                                            disabled={true}
                                            className='btn '>Cancel</button>
                                         </>   : ""
                                }

                            </td>
                            <td>
                                {
                                    res.deliveryStatus === "rider_ariving" ? <button
                                        onClick={() => handelStatus(res, "picked_up")}
                                        disabled={ariving} className='btn btn-primary text-secondary'> Pick up</button> :
                                        <button disabled={true} className={`${res.deliveryStatus === "picked_up" ? "hidden" : "btn"}`}> Pick up</button>
                                }
                                {
                                    res.deliveryStatus === "picked_up" && <button
                                        onClick={() => handelStatus(res, "delivered")}
                                        disabled={ariving} className='btn btn-primary text-secondary'>Delivery Confirm</button>
                                }
                            </td>

                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default PendingOrder