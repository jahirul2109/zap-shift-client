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
            <h1>payment-info</h1>
            <div>
                {
                    data.map(result => <h1 key={result._id}>{result.trackingId} || {result.parcelName} || {result.paymentIntent}</h1>)
                }
            </div>
        </div>
    )
}
