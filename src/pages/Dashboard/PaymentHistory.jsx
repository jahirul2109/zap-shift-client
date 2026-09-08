import React, { useEffect, useState } from 'react'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingDashboard from '../../utilits/LoadingDashboard';

export const PaymentHistory = () => {
    const axiousInstence = useAxiousSecoure();
    const { user } = useAuth();

    // useEffect(() => {
    //     axiousInstence.get(`/payment-info?email=${user.email}`)
    //         .then(res => {
    //             setData(res.data)
    //         })
    // }, [])
    // console.log(data)
    const { data: parcelInfo = [], isLoading, error, refetch } = useQuery({
        queryKey: ["parcelInfo", user.email, "limit"],
        queryFn: async () => {
            const result = await axiousInstence.get(`/payment-info?email=${user.email}&limit=10`)
            return result.data;
        }
    })

    if (isLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }
    return (
        <div className=' '>
            {parcelInfo.length === 0 ? <span className='font-bold py-7 w-full flex justify-center items-center text-xl md:text-2xl text-secondary text-center'>No Transaction found</span> :
                <div className="overflow-x-auto ">
                    <table className="table table-zebra relative ">
                        {/* head */}
                        <thead className=''>
                            <tr className='text-secondary bg-primary'>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Tracking Id</th>
                                <th>Transaction Id</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                parcelInfo.map((result, index) =>
                                    <tr
                                        key={result._id}>
                                        <th>{index + 1}</th>
                                        <td>{result.parcelName}</td>
                                        <td>${result.cost}</td>
                                        <td>{result.trackingId}</td>
                                        <td>{result.paymentIntent}</td>
                                        <td>{new Date(result.paidAt).toLocaleString()}</td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}
