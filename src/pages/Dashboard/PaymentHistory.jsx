import React, { useEffect, useState } from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'
import useAuth from '../../hook/useAuth';

export const PaymentHistory = () => {
    const axiousInstence = useAxiousSecoure();
    const [data, setData] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        axiousInstence.get(`/payment-info?email=${user.email}`)
            .then(res => {
                setData(res.data)
            })
    }, [])
    console.log(data)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Tracking Id</th>
                            <th>Transaction Id</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            data.map((result , index) =>
                                <tr key = {result._id}>
                                    <th>{index + 1}</th>
                                    <td>{result.parcelName}</td>
                                    <td>{result.cost}</td>
                                    <td>{result.trackingId}</td>
                                    <td>{result.paymentIntent}</td>
                                    <td>{result.paidAt}</td>
                                </tr>)
                        }

                        {/* row 2 */}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
